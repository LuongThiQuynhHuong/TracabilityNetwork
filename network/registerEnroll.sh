#!/bin/bash

function createregulatorydepartment() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/regulatoryDepartment.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-regulatoryDepartment --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-regulatoryDepartment.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-regulatoryDepartment.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-regulatoryDepartment.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-regulatoryDepartment.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy manufacturer's CA cert to manufacturer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem" "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/msp/tlscacerts/ca.crt"

  # Copy manufacturer's CA cert to manufacturer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem" "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/tlsca/tlsca.regulatoryDepartment.com-cert.pem"

  # Copy manufacturer's CA cert to manufacturer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/ca"
  cp "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem" "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/ca/ca.regulatoryDepartment.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-regulatoryDepartment --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-regulatoryDepartment --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-regulatoryDepartment --id.name regulatorydepartmentadmin --id.secret regulatorydepartmentadminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-regulatoryDepartment -M "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-regulatoryDepartment -M "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls" --enrollment.profile tls --csr.hosts peer0.regulatoryDepartment.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/peers/peer0.regulatoryDepartment.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-regulatoryDepartment -M "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/users/User1@regulatoryDepartment.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/users/User1@regulatoryDepartment.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://regulatorydepartmentadmin:regulatorydepartmentadminpw@localhost:7054 --caname ca-regulatoryDepartment -M "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/users/Admin@regulatoryDepartment.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/regulatoryDepartment/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/regulatoryDepartment.com/users/Admin@regulatoryDepartment.com/msp/config.yaml"
}

function createfarm() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/farm.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/farm.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-farm --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-farm.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-farm.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-farm.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-farm.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/farm.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy wholesaler's CA cert to wholesaler's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/farm.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/farm/ca-cert.pem" "${PWD}/organizations/peerOrganizations/farm.com/msp/tlscacerts/ca.crt"

  # Copy wholesaler's CA cert to wholesaler's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/farm.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/farm/ca-cert.pem" "${PWD}/organizations/peerOrganizations/farm.com/tlsca/tlsca.farm.com-cert.pem"

  # Copy wholesaler's CA cert to wholesaler's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/farm.com/ca"
  cp "${PWD}/organizations/fabric-ca/farm/ca-cert.pem" "${PWD}/organizations/peerOrganizations/farm.com/ca/ca.farm.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-farm --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  # echo "Registering peer1"
  # set -x
  # fabric-ca-client register --caname ca-farm --id.name peer1 --id.secret peer1pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  # { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-farm --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-farm --id.name farmadmin --id.secret farmadminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-farm -M "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/farm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-farm -M "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls" --enrollment.profile tls --csr.hosts peer0.farm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/farm.com/peers/peer0.farm.com/tls/server.key"

  #   echo "Generating the peer1 msp"
  # set -x
  # fabric-ca-client enroll -u https://peer1:peer1pw@localhost:8054 --caname ca-farm -M "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  # { set +x; } 2>/dev/null

  # cp "${PWD}/organizations/peerOrganizations/farm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/msp/config.yaml"

  # echo "Generating the peer1-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  # set -x
  # fabric-ca-client enroll -u https://peer1:peer1pw@localhost:8054 --caname ca-farm -M "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls" --enrollment.profile tls --csr.hosts peer1.farm.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  # { set +x; } 2>/dev/null

  # # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  # cp "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls/ca.crt"
  # cp "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls/server.crt"
  # cp "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/farm.com/peers/peer1.farm.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-farm -M "${PWD}/organizations/peerOrganizations/farm.com/users/User1@farm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/farm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farm.com/users/User1@farm.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://farmadmin:farmadminpw@localhost:8054 --caname ca-farm -M "${PWD}/organizations/peerOrganizations/farm.com/users/Admin@farm.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/farm/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/farm.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/farm.com/users/Admin@farm.com/msp/config.yaml"
}

function createdistributor() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/distributor.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/distributor.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:12054 --caname ca-distributor --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-distributor.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-distributor.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-distributor.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-12054-ca-distributor.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/distributor.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy distributer's CA cert to distributer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/distributor.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/distributor.com/msp/tlscacerts/ca.crt"

  # Copy distributer's CA cert to distributer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/distributor.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/distributor.com/tlsca/tlsca.distributor.com-cert.pem"

  # Copy distributer's CA cert to distributer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/distributor.com/ca"
  cp "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/distributor.com/ca/ca.distributor.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-distributor --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-distributor --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-distributor --id.name distributoradmin --id.secret distributoradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:12054 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/distributor.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:12054 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls" --enrollment.profile tls --csr.hosts peer0.distributor.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/distributor.com/peers/peer0.distributor.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:12054 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.com/users/User1@distributor.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/distributor.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/distributor.com/users/User1@distributor.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://distributoradmin:distributoradminpw@localhost:12054 --caname ca-distributor -M "${PWD}/organizations/peerOrganizations/distributor.com/users/Admin@distributor.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/distributor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/distributor.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/distributor.com/users/Admin@distributor.com/msp/config.yaml"
}

function createprocessor() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/processor.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/processor.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:11054 --caname ca-processor --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-processor.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-processor.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-processor.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-processor.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/processor.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy market's CA cert to market's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/processor.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/processor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/processor.com/msp/tlscacerts/ca.crt"

  # Copy market's CA cert to market's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/processor.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/processor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/processor.com/tlsca/tlsca.processor.com-cert.pem"

  # Copy market's CA cert to market's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/processor.com/ca"
  cp "${PWD}/organizations/fabric-ca/processor/ca-cert.pem" "${PWD}/organizations/peerOrganizations/processor.com/ca/ca.processor.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-processor --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-processor --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-processor --id.name processoradmin --id.secret processoradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-processor -M "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/processor.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-processor -M "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls" --enrollment.profile tls --csr.hosts peer0.processor.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/processor.com/peers/peer0.processor.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:11054 --caname ca-processor -M "${PWD}/organizations/peerOrganizations/processor.com/users/User1@processor.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/processor.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/processor.com/users/User1@processor.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://processoradmin:processoradminpw@localhost:11054 --caname ca-processor -M "${PWD}/organizations/peerOrganizations/processor.com/users/Admin@processor.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/processor/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/processor.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/processor.com/users/Admin@processor.com/msp/config.yaml"
}


function createOrderer() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/agri.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/agri.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/agri.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orderer org's CA cert to orderer org's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/agri.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/agri.com/msp/tlscacerts/tlsca.agri.com-cert.pem"

  # Copy orderer org's CA cert to orderer org's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/ordererOrganizations/agri.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/agri.com/tlsca/tlsca.agri.com-cert.pem"

  echo "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/agri.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/msp/config.yaml"

  echo "Generating the orderer-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/tls" --enrollment.profile tls --csr.hosts orderer.agri.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the orderer's tls directory that are referenced by orderer startup config
  cp "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/farm.com/orderers/orderer.farm.com/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/farm.com/orderers/orderer.farm.com/tls/server.key"

  # Copy orderer org's CA cert to orderer's /msp/tlscacerts directory (for use in the orderer MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/agri.com/orderers/orderer.agri.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/farm.com/orderers/orderer.farm.com/msp/tlscacerts/tlsca.farm.com-cert.pem"

  echo "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/agri.com/users/Admin@agri.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/agri.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/agri.com/users/Admin@agri.com/msp/config.yaml"
}

createregulatorydepartment
createfarm
createdistributor
createprocessor
createOrderer