const constants = require("../utils/contants")

const { profile } = require("./profile");

const { promises: fs } = require("fs");

const path = require("path");

const crypto = require("crypto");

const grpc = require("@grpc/grpc-js");

const { connect, signers } = require("@hyperledger/fabric-gateway");

class clientApplication {
    async submitTxn(
        organization,
        channelName,
        chaincodeName,
        contractName,
        txnType,
        txnName,
        ...args
    ) {
        let orgProfile = profile[organization];

        const client = await newGrpcConnection(
            orgProfile["tlsCertPath"],
            orgProfile["peerEndpoint"],
            orgProfile["peerHostAlias"]
        );

        const gateway = connect({
            client,

            identity: await newIdentity(orgProfile["certPath"], orgProfile["mspId"]),

            signer: await newSigner(orgProfile["keyDirectoryPath"]),
        });

        try {
            let network = await gateway.getNetwork(channelName);

            let contract = await network.getContract(chaincodeName, contractName);

            let resultBytes;

            if (txnType == constants.HLF_TRANSACTION_TYPE.INVOKE_TXN) {
                resultBytes = await contract.submitTransaction(txnName, ...args);
            } else if (txnType == constants.HLF_TRANSACTION_TYPE.QUERY_TXN) {
                resultBytes = await contract.evaluateTransaction(txnName, ...args);
            } else {
                console.log("Invalid txnType", txnType);
            }

            console.log("*** Result:", resultBytes);

            return Promise.resolve(resultBytes);
        } catch (error) {
            console.log("Error occured", error);

            return Promise.reject(error);
        } finally {
            gateway.close();

            client.close();
        }
    }
}

async function newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias) {
    const tlsRootCert = await fs.readFile(tlsCertPath);

    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);

    return new grpc.Client(peerEndpoint, tlsCredentials, {
        "grpc.ssl_target_name_override": peerHostAlias,
    });
}

async function newIdentity(certPath, mspId) {
    const credentials = await fs.readFile(certPath);

    return { mspId, credentials };
}

async function newSigner(keyDirectoryPath) {
    const files = await fs.readdir(keyDirectoryPath);

    const keyPath = path.resolve(keyDirectoryPath, files[0]);

    const privateKeyPem = await fs.readFile(keyPath);

    const privateKey = crypto.createPrivateKey(privateKeyPem);

    return signers.newPrivateKeySigner(privateKey);
}

module.exports = {
    clientApplication,
};
