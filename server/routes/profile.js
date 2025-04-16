
let profile = {
    regulatoryDepartment: {
        "cryptoPath": "../../network/organizations/peerOrganizations/regulatoryDepartment.com", 
		"keyDirectoryPath": "../../network/organizations/peerOrganizations/regulatoryDepartment.com/users/User1@regulatoryDepartment.com/msp/keystore/",
        "certPath":     "../../network/organizations/peerOrganizations/regulatoryDepartment.com/users/User1@regulatoryDepartment.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../network/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.regulatoryDepartment.com",
        "mspId": "RegulatoryDepartmentMSP"
    },
    farm: {
        "cryptoPath": "../../network/organizations/peerOrganizations/farm.com", 
		"keyDirectoryPath": "../../network/organizations/peerOrganizations/farm.com/users/User1@farm.com/msp/keystore/",
        "certPath":     "../../network/organizations/peerOrganizations/farm.com/users/User1@farm.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../network/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/ca.crt",
		"peerEndpoint": "localhost:8051",
		"peerHostAlias":  "peer0.farm.com",
        "mspId": "FarmMSP"
    },
    processor: {
        "cryptoPath": "../../network/organizations/peerOrganizations/processor.com", 
		"keyDirectoryPath": "../../network/organizations/peerOrganizations/processor.com/users/User1@processor.com/msp/keystore/",
        "certPath":     "../../network/organizations/peerOrganizations/processor.com/users/User1@processor.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../network/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.processor.com",
        "mspId": "ProcessorMSP"
    },
    distributor: {
        "cryptoPath": "../../network/organizations/peerOrganizations/distributor.com", 
		"keyDirectoryPath": "../../network/organizations/peerOrganizations/distributor.com/users/User1@distributor.com/msp/keystore/",
        "certPath":     "../../network/organizations/peerOrganizations/distributor.com/users/User1@distributor.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../network/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/ca.crt",
		"peerEndpoint": "localhost:10051",
		"peerHostAlias":  "peer0.distributor.com",
        "mspId": "DistributorMSP"
    },
    retailer: {
        "cryptoPath": "../../network/organizations/peerOrganizations/retailer.com", 
		"keyDirectoryPath": "../../network/organizations/peerOrganizations/retailer.com/users/User1@retailer.com/msp/keystore/",
        "certPath":     "../../network/organizations/peerOrganizations/retailer.com/users/User1@retailer.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../network/organizations/peerOrganizations/retailer.com/peers/peer0.retailer.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.retailer.com",
        "mspId": "RetailerMSP"
    }
}
module.exports = { profile }
