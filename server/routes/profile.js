
let profile = {
    regulatoryDepartment: {
        "cryptoPath": "../network/organizations/peerOrganizations/regulatoryDepartment.ptracing.com", 
		"keyDirectoryPath": "../network/organizations/peerOrganizations/regulatoryDepartment.ptracing.com/users/User1@regulatoryDepartment.ptracing.com/msp/keystore/",
        "certPath":     "../network/organizations/peerOrganizations/regulatoryDepartment.ptracing.com/users/User1@regulatoryDepartment.ptracing.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../network/organizations/peerOrganizations/regulatoryDepartment.ptracing.com/peers/peer0.regulatoryDepartment.ptracing.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.regulatoryDepartment.ptracing.com",
        "mspId": "regulatoryDepartmentMSP"
    },
    farm: {
        "cryptoPath": "../network/organizations/peerOrganizations/farm.ptracing.com", 
		"keyDirectoryPath": "../network/organizations/peerOrganizations/farm.ptracing.com/users/User1@farm.ptracing.com/msp/keystore/",
        "certPath":     "../network/organizations/peerOrganizations/farm.ptracing.com/users/User1@farm.ptracing.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../network/organizations/peerOrganizations/farm.ptracing.com/peers/peer0.farm.ptracing.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.farm.ptracing.com",
        "mspId": "farmMSP"
    },
    processor: {
        "cryptoPath": "../network/organizations/peerOrganizations/processor.ptracing.com", 
		"keyDirectoryPath": "../network/organizations/peerOrganizations/processor.ptracing.com/users/User1@processor.ptracing.com/msp/keystore/",
        "certPath":     "../network/organizations/peerOrganizations/processor.ptracing.com/users/User1@processor.ptracing.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../network/organizations/peerOrganizations/processor.ptracing.com/peers/peer0.processor.ptracing.com/tls/ca.crt",
		"peerEndpoint": "localhost:8051",
		"peerHostAlias":  "peer0.processor.ptracing.com",
        "mspId": "processorMSP"
    },
    distributor: {
        "cryptoPath": "../network/organizations/peerOrganizations/distributor.ptracing.com", 
		"keyDirectoryPath": "../network/organizations/peerOrganizations/distributor.ptracing.com/users/User1@distributor.ptracing.com/msp/keystore/",
        "certPath":     "../network/organizations/peerOrganizations/distributor.ptracing.com/users/User1@distributor.ptracing.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../network/organizations/peerOrganizations/distributor.ptracing.com/peers/peer0.distributor.ptracing.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.distributor.ptracing.com",
        "mspId": "distributorMSP"
    },
    retailer: {
        "cryptoPath": "../network/organizations/peerOrganizations/retailer.ptracing.com", 
		"keyDirectoryPath": "../network/organizations/peerOrganizations/retailer.ptracing.com/users/User1@retailer.ptracing.com/msp/keystore/",
        "certPath":     "../network/organizations/peerOrganizations/retailer.ptracing.com/users/User1@retailer.ptracing.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../network/organizations/peerOrganizations/retailer.ptracing.com/peers/peer0.retailer.ptracing.com/tls/ca.crt",
		"peerEndpoint": "localhost:10051",
		"peerHostAlias":  "peer0.retailer.ptracing.com",
        "mspId": "retailerMSP"
    }
}
module.exports = { profile }
