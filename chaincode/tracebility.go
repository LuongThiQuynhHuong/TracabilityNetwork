package main

import (
	"encoding/json"
	"fmt"
	"log"
	"reflect"
	"strings"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/v2/shim"
	"github.com/hyperledger/fabric-contract-api-go/v2/contractapi"
)

/////////////////////////////////////////////////////// Constants ///////////////////////////////////////////////////////

const ORGANIZATION_DOCTYPE string = "organization"
const ORGANIZATION_ROLE_DOCTYPE string = "organizationRole"
const FARM_PRODUCT_DOCTYPE string = "farmProduct"
const PRODUCT_TYPE_DOCTYPE string = "productType"
const PACKAGE_DOCTYPE string = "package"
const SHIPMENT_DOCTYPE string = "shipment"

// ///////////////////////////////////////////////////// Enum ///////////////////////////////////////////////////////
type OrgRoleType int

const (
	RegulatoryDepartment OrgRoleType = iota
	Farm
	Processor
	Distributor
	Retailer
)

func (f OrgRoleType) String() string {
	return [...]string{"RegulatoryDepartment", "Farm", "Processor", "Distributor", "Retailer"}[f]
}

var OrgRoleTypeMap = map[string]OrgRoleType{
	"regulatorydepartment": RegulatoryDepartment,
	"farm":                 Farm,
	"processor":            Processor,
	"distributor":          Distributor,
	"retailer":             Retailer,
}

func GetOrgRoleType(s string) (OrgRoleType, error) {
	s = strings.ToLower(s)
	if orgRoleType, exists := OrgRoleTypeMap[s]; exists {
		return orgRoleType, nil
	}
	return -1, fmt.Errorf("invalid organization role: %s", s)
}

type FarmProductStatus int

const (
	Growing FarmProductStatus = iota
	Mature
	Processed
)

func (f FarmProductStatus) String() string {
	return [...]string{"Growing", "Mature", "Processed"}[f]
}

var FarmProductStatusMap = map[string]FarmProductStatus{
	"growing":   Growing,
	"mature":    Mature,
	"processed": Processed,
}

func GetFarmProductStatus(s string) (FarmProductStatus, error) {
	s = strings.ToLower(s)
	if farmProductStatus, exists := FarmProductStatusMap[s]; exists {
		return farmProductStatus, nil
	}
	return -1, fmt.Errorf("invalid farm product status: %s", s)
}

type ProductTypeStatus int

const (
	Requesting ProductTypeStatus = iota
	Approved
	Declined
)

func (f ProductTypeStatus) String() string {
	return [...]string{"Requesting", "Approved", "Declined"}[f]
}

var ProductTypeStatusMap = map[string]ProductTypeStatus{
	"requesting": Requesting,
	"approved":   Approved,
	"declined":   Declined,
}

func GetProductTypeStatus(s string) (ProductTypeStatus, error) {
	s = strings.ToLower(s)
	if productTypeStatus, exists := ProductTypeStatusMap[s]; exists {
		return productTypeStatus, nil
	}
	return -1, fmt.Errorf("invalid product type status: %s", s)
}

type PackageStatus int

const (
	Packaged PackageStatus = iota
	Shipping
	Distributed
)

func (f PackageStatus) String() string {
	return [...]string{"Packaged", "Shipping", "Distributed"}[f]
}

var PackageStatusMap = map[string]PackageStatus{
	"packaged":    Packaged,
	"shipping":    Shipping,
	"distributed": Distributed,
}

func GetPackageStatus(s string) (PackageStatus, error) {
	s = strings.ToLower(s)
	if packageStatus, exists := PackageStatusMap[s]; exists {
		return packageStatus, nil
	}
	return -1, fmt.Errorf("invalid package status: %s", s)
}

type ShipmentStatus int

const (
	Ready ShipmentStatus = iota
	InTransit
	Done
)

func (f ShipmentStatus) String() string {
	return [...]string{"Ready", "InTransit", "Done"}[f]
}

var shipmentStatusMap = map[string]ShipmentStatus{
	"ready":     Ready,
	"intransit": InTransit,
	"done":      Done,
}

func GetShipmentStatus(s string) (ShipmentStatus, error) {
	s = strings.ToLower(s)
	if shipmentStatus, exists := shipmentStatusMap[s]; exists {
		return shipmentStatus, nil
	}
	return -1, fmt.Errorf("invalid shipment status: %s", s)
}

/////////////////////////////////////////////////////// Structs ///////////////////////////////////////////////////////

type SmartContract struct {
	contractapi.Contract
}

type Organization struct {
	DocType string `json:"docType"`
	ID      string `json:"id"`
	Name    string `json:"name"`
	Address string `json:"address"`
}

type OrganizationRole struct {
	DocType string `json:"docType"`
	ID      string `json:"id"`
	OrgID   string `json:"orgId"`
	Role    string `json:"role"`
}

type FarmProduct struct {
	DocType           string  `json:"docType"`
	ID                string  `json:"id"`
	Name              string  `json:"name"`
	Status            string  `json:"status"`
	FarmOrgID         string  `json:"farmOrgId"`
	FarmName          string  `json:"farmName"`
	UnitOfMeasure     string  `json:"unitOfMeasure"`
	Amount            float64 `json:"amount"`
	CurrentOwnerOrgID string  `json:"currentOwnerOrgId"`
	CurrentOwnerName  string  `json:"currentOwnerName"`
	SubmitterMSPID    string  `json:"submitterMSPID"`
	SubmitterName     string  `json:"submitterName"`
	InvokedFunction   string  `json:"invokedFunction"`
}

type ProductType struct {
	DocType       string `json:"docType"`
	ID            string `json:"id"`
	Name          string `json:"name"`
	Brand         string `json:"brand"`
	Status        string `json:"status"`
	RegisterOrgID string `json:"registerOrgId"`
	ApprovedOrgID string `json:"approvedOrgId"`
	DeclinedOrgID string `json:"declinedOrgId"`
}

type Package struct {
	DocType           string  `json:"docType"`
	ID                string  `json:"id"`
	RawProductID      string  `json:"rawProductId"`
	ProductTypeID     string  `json:"productTypeId"`
	ProductTypeName   string  `json:"productTypeName"`
	Brand             string  `json:"brand"`
	Status            string  `json:"status"`
	PackagedDateTime  string  `json:"packagedDateTime"`
	ExpiryDate        string  `json:"expiryDate"`
	UnitOfMeasure     string  `json:"unitOfMeasure"`
	Amount            float64 `json:"amount"`
	LastShipmentID    string  `json:"lastShipmentId"`
	ProcessorOrgID    string  `json:"processorOrgId"`
	ProcessorName     string  `json:"processorName"`
	CurrentOwnerOrgID string  `json:"currentOwnerOrgId"`
	CurrentOwnerName  string  `json:"currentOwnerName"`
	SubmitterMSPID    string  `json:"submitterMSPID"`
	SubmitterName     string  `json:"submitterName"`
	InvokedFunction   string  `json:"invokedFunction"`
}

type Shipment struct {
	DocType            string `json:"docType"`
	ID                 string `json:"id"`
	Status             string `json:"status"`
	FromAddress        string `json:"fromAddress"`
	DestinationAddress string `json:"destinationAddress"`
	StartTime          string `json:"startTime"`
	EndTime            string `json:"endTime"`
	ProcessorOrgID     string `json:"processorOrgId"`
	RetailerOrgID      string `json:"retailerOrgId"`
	DistributorOrgID   string `json:"distributorOrgId"`
}

// PackageHistory is used to record the history of a package.
type PackageHistory struct {
	Record    *Package  `json:"record"`
	TxId      string    `json:"txId"`
	Timestamp time.Time `json:"timestamp"`
	IsDelete  bool      `json:"isDelete"`
}

// RawProductHistory is used to record the history of a raw product.
type RawProductHistory struct {
	Record    *FarmProduct `json:"record"`
	TxId      string       `json:"txId"`
	Timestamp time.Time    `json:"timestamp"`
	IsDelete  bool         `json:"isDelete"`
}

type CombinedHistory struct {
	PackageHistory    []*PackageHistory    `json:"packageHistory"`
	RawProductHistory []*RawProductHistory `json:"rawProductHistory"`
}

/////////////////////////////////////////////////////// Utility ///////////////////////////////////////////////////////

func GetDateTimeAsString(t time.Time) string {
	return t.Format("2006-01-02 15:04:05")
}

func ValidateDateTime(dateStr string) (time.Time, error) {
	layout := "2006-01-02 15:04:05"
	t, err := time.Parse(layout, dateStr)
	if err != nil {
		return time.Time{}, fmt.Errorf("invalid datetime format: %v", err)
	}
	return t, nil
}

func ToCamelCase(name string) string {
	// Split the string by whitespace.
	parts := strings.Fields(name)
	if len(parts) == 0 {
		return ""
	}

	// The first word is entirely lower case.
	camel := strings.ToLower(parts[0])

	// Capitalize the first letter of each subsequent word and lower the rest.
	for _, word := range parts[1:] {
		if len(word) > 0 {
			camel += strings.ToUpper(word[:1]) + strings.ToLower(word[1:])
		}
	}
	return camel
}

func GetKey(structInstance any, assetID string) string {
	structName := reflect.TypeOf(structInstance).Name()
	structName = strings.ToLower(structName[:1]) + structName[1:]

	if strings.HasPrefix(assetID, structName+"-") {
		// If assetID already has the structName as prefix, return the assetID
		return assetID
	}

	return fmt.Sprintf("%s-%s", structName, assetID)
}

func GetOrgRoleTypeKey(orgKey string, role OrgRoleType) string {
	return fmt.Sprintf("%s-%s", GetKey(OrganizationRole{}, orgKey), role.String())
}

func GetQueryResultForQueryString(ctx contractapi.TransactionContextInterface, queryString string) (shim.StateQueryIteratorInterface, error) {
	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}

	defer resultsIterator.Close()

	return resultsIterator, nil
}

// check if orgKey has role
func CheckOrgRole(ctx contractapi.TransactionContextInterface, orgKey, role string) (bool, error) {
	queryString := fmt.Sprintf(`{"selector":{"docType":"%s","orgId":"%s"}}`, ORGANIZATION_ROLE_DOCTYPE, orgKey)

	resultsIterator, err := GetQueryResultForQueryString(ctx, queryString)
	if err != nil {
		return false, err
	}

	for resultsIterator.HasNext() {
		queryResult, err := resultsIterator.Next()
		if err != nil {
			return false, err
		}

		var orgRoleObj OrganizationRole
		err = json.Unmarshal(queryResult.Value, &orgRoleObj)
		if err != nil {
			continue
		}

		if orgRoleObj.Role == role {
			return true, nil
		}
	}

	return false, nil
}

func CheckFarmProductStatusTransition(currentStatus, newStatus FarmProductStatus) error {
	switch currentStatus {
	case Growing:
		if newStatus == Mature {
			return nil
		}

	case Mature:
		if newStatus == Processed {
			return nil
		}
	}

	return fmt.Errorf("the new status is not a valid transition from the current farm product status")
}

func ReadAsset[T OrganizationRole | Organization | FarmProduct | ProductType | Package | Shipment](ctx contractapi.TransactionContextInterface, assetId string) (*T, error) {
	assetBytes, err := ctx.GetStub().GetState(assetId)
	if err != nil {
		return nil, fmt.Errorf("failed to get asset %s: %v", assetId, err)
	}
	if assetBytes == nil {
		return nil, fmt.Errorf("asset %s does not exist", assetId)
	}

	var asset T
	err = json.Unmarshal(assetBytes, &asset)
	if err != nil {
		return nil, err
	}

	return &asset, nil
}

func (s *SmartContract) GetPackageHistory(ctx contractapi.TransactionContextInterface, packageKey string) ([]*PackageHistory, error) {
	resultsIterator, err := ctx.GetStub().GetHistoryForKey(packageKey)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var records []*PackageHistory
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var pkg Package
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &pkg)
			if err != nil {
				return nil, err
			}
		} else {
			pkg = Package{
				ID: packageKey,
			}
		}

		record := PackageHistory{
			TxId:      response.TxId,
			Timestamp: response.Timestamp.AsTime(),
			Record:    &pkg,
			IsDelete:  response.IsDelete,
		}
		records = append(records, &record)
	}

	return records, nil
}

func (s *SmartContract) GetFarmProductHistory(ctx contractapi.TransactionContextInterface, farmProductKey string) ([]*RawProductHistory, error) {
	resultsIterator, err := ctx.GetStub().GetHistoryForKey(farmProductKey)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var records []*RawProductHistory
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var farmProduct FarmProduct
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &farmProduct)
			if err != nil {
				return nil, err
			}
		} else {
			farmProduct = FarmProduct{
				ID: farmProductKey,
			}
		}

		record := RawProductHistory{
			TxId:      response.TxId,
			Timestamp: response.Timestamp.AsTime(),
			Record:    &farmProduct,
			IsDelete:  response.IsDelete,
		}
		records = append(records, &record)
	}

	return records, nil
}

func (s *SmartContract) InitializeOrganizationAndRole(ctx contractapi.TransactionContextInterface, orgKey, orgName, address string, role OrgRoleType) error {
	standardOrgKey := GetKey(Organization{}, orgKey)

	err := s.AddNewOrganization(ctx, standardOrgKey, orgName, address)
	if err != nil {
		return err
	}

	// Create new organization role
	newRole := &OrganizationRole{
		DocType: ORGANIZATION_ROLE_DOCTYPE,
		ID:      GetOrgRoleTypeKey(orgKey, role),
		OrgID:   standardOrgKey,
		Role:    role.String(),
	}

	// Marshal new organization into JSON format
	orgRoleBytes, err := json.Marshal(newRole)
	if err != nil {
		return fmt.Errorf("failed to marshal new organization role: %v", err)
	}

	// Store the new organization in the world state
	err = ctx.GetStub().PutState(newRole.ID, orgRoleBytes)
	if err != nil {
		return fmt.Errorf("failed to store organization in world state for new role ID %s: %v", newRole.ID, err)
	}

	return nil
}

/////////////////////////////////////////////////////// Smart contracts ///////////////////////////////////////////////////////

func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {

	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

// CALLED WHEN JOIN CHANNEL
func (s *SmartContract) AddNewOrganization(ctx contractapi.TransactionContextInterface, orgKey, name, address string) error {

	orgKey = GetKey(Organization{}, orgKey)

	isExisted, err := s.AssetExists(ctx, orgKey)
	if err != nil {
		return err
	}

	if isExisted {
		return fmt.Errorf("organization already exists")
	}

	// Create new organization document
	newOrg := &Organization{
		DocType: ORGANIZATION_DOCTYPE,
		ID:      orgKey,
		Name:    name,
		Address: address,
	}

	// Marshal new organization into JSON format
	orgBytes, err := json.Marshal(newOrg)
	if err != nil {
		return fmt.Errorf("failed to marshal new organization: %v", err)
	}

	// Store the new organization in the world state
	err = ctx.GetStub().PutState(orgKey, orgBytes)
	if err != nil {
		return fmt.Errorf("failed to store organization in world state for orgId %s: %v", orgKey, err)
	}

	return nil
}

func (s *SmartContract) RegisterOrgRole(ctx contractapi.TransactionContextInterface, role, orgKey string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}

	registeredRoleType, err := GetOrgRoleType(role)
	if err != nil {
		return err
	}

	registerOrgKey := GetKey(Organization{}, requestingOrg)

	isExistedOrg, err := s.AssetExists(ctx, registerOrgKey)
	if err != nil {
		return err
	}

	if !isExistedOrg {
		return fmt.Errorf("register organization does not exist")
	}

	isEnoughPrivilege, err := CheckOrgRole(ctx, registerOrgKey, RegulatoryDepartment.String())
	if err != nil {
		return err
	}

	if !isEnoughPrivilege {
		return fmt.Errorf("do not have registration privilege")
	}

	registeredOrgKey := GetKey(Organization{}, orgKey)

	isExistedOrg, err = s.AssetExists(ctx, registeredOrgKey)
	if err != nil {
		return err
	}

	if !isExistedOrg {
		return fmt.Errorf("organization does not exist")
	}

	isRegistered, err := CheckOrgRole(ctx, registeredOrgKey, registeredRoleType.String())
	if err != nil {
		return err
	}
	if isRegistered {
		return fmt.Errorf("organization already has this role")
	}

	// Create new organization role
	newRole := &OrganizationRole{
		DocType: ORGANIZATION_ROLE_DOCTYPE,
		ID:      GetOrgRoleTypeKey(orgKey, registeredRoleType),
		OrgID:   registeredOrgKey,
		Role:    registeredRoleType.String(),
	}

	// Marshal new organization into JSON format
	orgRoleBytes, err := json.Marshal(newRole)
	if err != nil {
		return fmt.Errorf("failed to marshal new organization role: %v", err)
	}

	// Store the new organization in the world state
	err = ctx.GetStub().PutState(newRole.ID, orgRoleBytes)
	if err != nil {
		return fmt.Errorf("failed to store organization in world state for new role ID %s: %v", newRole.ID, err)
	}

	return nil
}

func (s *SmartContract) AddFarmProduct(ctx contractapi.TransactionContextInterface, farmProductKey, name, unitOfMeasure string, amount float64) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	requestingOrgKey := GetKey(Organization{}, requestingOrg)

	isFarmer, err := CheckOrgRole(ctx, requestingOrgKey, Farm.String())
	if err != nil {
		return err
	}

	if !isFarmer {
		return fmt.Errorf("only organizations registered as Farm can add farm products")
	}

	org, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	newProduct := &FarmProduct{
		DocType:           FARM_PRODUCT_DOCTYPE,
		ID:                GetKey(FarmProduct{}, farmProductKey),
		Name:              name,
		UnitOfMeasure:     unitOfMeasure,
		Amount:            amount,
		Status:            Growing.String(),
		FarmOrgID:         requestingOrgKey,
		FarmName:          org.Name,
		CurrentOwnerOrgID: requestingOrgKey,
		CurrentOwnerName:  org.Name,
		SubmitterMSPID:    requestingOrg,
		SubmitterName:     org.Name,
		InvokedFunction:   "Add Farm Product",
	}

	// Marshal new organization into JSON format
	newProductBytes, err := json.Marshal(newProduct)
	if err != nil {
		return fmt.Errorf("failed to marshal new farm product: %v", err)
	}

	// Store the new organization in the world state
	err = ctx.GetStub().PutState(newProduct.ID, newProductBytes)
	if err != nil {
		return fmt.Errorf("failed to store new farm product in world state for new farm product ID %s: %v", newProduct.ID, err)
	}

	return nil
}

func (s *SmartContract) UpdateFarmProductStatus(ctx contractapi.TransactionContextInterface, farmProductKey, newStatus string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	farmProductKey = GetKey(FarmProduct{}, farmProductKey)
	farmProduct, err := ReadAsset[FarmProduct](ctx, farmProductKey)
	if err != nil {
		return err
	}

	//check valid next status
	currentStatus, err := GetFarmProductStatus(farmProduct.Status)
	if err != nil {
		return err
	}
	nextStatus, err := GetFarmProductStatus(newStatus)
	if err != nil {
		return err
	}
	err = CheckFarmProductStatusTransition(currentStatus, nextStatus)
	if err != nil {
		return err
	}

	//check current owner
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	if farmProduct.CurrentOwnerOrgID != requestingOrgKey {
		return fmt.Errorf("only the current owner can update the farm product status")
	}
	submitter, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	//update farm product status
	// farmProduct.InvokedFunction = "Update the status of the farm product from " + farmProduct.Status + " to " + nextStatus.String()
	farmProduct.InvokedFunction = "Update the status of the farm product"
	farmProduct.Status = nextStatus.String()
	farmProduct.SubmitterMSPID = requestingOrg
	farmProduct.SubmitterName = submitter.Name

	farmProductBytes, err := json.Marshal(farmProduct)
	if err != nil {
		return fmt.Errorf("failed to marshal the farm product: %v", err)
	}

	err = ctx.GetStub().PutState(farmProduct.ID, farmProductBytes)
	if err != nil {
		return fmt.Errorf("failed to update farm product status for the farm product with ID %s: %v", farmProduct.ID, err)
	}

	return nil
}

func (s *SmartContract) TransferFarmProduct(ctx contractapi.TransactionContextInterface, farmProductKey, newOrgKey string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	farmProductKey = GetKey(FarmProduct{}, farmProductKey)
	farmProduct, err := ReadAsset[FarmProduct](ctx, farmProductKey)
	if err != nil {
		return err
	}

	//check current owner
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	if farmProduct.CurrentOwnerOrgID != requestingOrgKey {
		return fmt.Errorf("only the current owner can initiate a transfer")
	}

	newOrgKey = GetKey(Organization{}, newOrgKey)
	newOrg, err := ReadAsset[Organization](ctx, newOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", newOrgKey)
	}

	submitter, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	//transfer farm product
	// farmProduct.InvokedFunction = "Transfer the farm product from " + farmProduct.CurrentOwnerOrgID + " to " + newOrgKey
	farmProduct.InvokedFunction = "Transfer the farm product"
	farmProduct.CurrentOwnerOrgID = newOrgKey
	farmProduct.CurrentOwnerName = newOrg.Name
	farmProduct.SubmitterMSPID = requestingOrg
	farmProduct.SubmitterName = submitter.Name

	farmProductBytes, err := json.Marshal(farmProduct)
	if err != nil {
		return fmt.Errorf("failed to marshal the farm product: %v", err)
	}

	err = ctx.GetStub().PutState(farmProduct.ID, farmProductBytes)
	if err != nil {
		return fmt.Errorf("failed to transfer farm product with ID %s: %v", farmProduct.ID, err)
	}

	return nil
}

func (s *SmartContract) RegisterProductType(ctx contractapi.TransactionContextInterface, name, brand string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	isProcessor, err := CheckOrgRole(ctx, requestingOrgKey, Processor.String())
	if err != nil {
		return err
	}
	if !isProcessor {
		return fmt.Errorf("only organizations with the Processor role can register a product type")
	}

	productTypeKey := ToCamelCase(name)
	if productTypeKey == "" {
		return fmt.Errorf("invalid product type name")
	}
	productTypeKey = GetKey(ProductType{}, productTypeKey)

	isExisted, err := s.AssetExists(ctx, productTypeKey)
	if err != nil {
		return err
	}
	if isExisted {
		return fmt.Errorf("product type is existed")
	}

	newProductType := &ProductType{
		DocType:       PRODUCT_TYPE_DOCTYPE,
		ID:            productTypeKey,
		Name:          name,
		Brand:         brand,
		Status:        Requesting.String(),
		RegisterOrgID: requestingOrgKey,
		ApprovedOrgID: "",
		DeclinedOrgID: "",
	}

	newProductTypeBytes, err := json.Marshal(newProductType)
	if err != nil {
		return fmt.Errorf("failed to marshal new product type: %v", err)
	}

	err = ctx.GetStub().PutState(newProductType.ID, newProductTypeBytes)
	if err != nil {
		return fmt.Errorf("failed to store new product type in world state for product type ID %s: %v", newProductType.ID, err)
	}

	return nil
}

func (s *SmartContract) ApproveProductType(ctx contractapi.TransactionContextInterface, productTypeKey string, isApproved bool) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	isRegulatoryDepartment, err := CheckOrgRole(ctx, requestingOrgKey, RegulatoryDepartment.String())
	if err != nil {
		return err
	}
	if !isRegulatoryDepartment {
		return fmt.Errorf("only organizations with the Regulatory Department role can appove or decline product types")
	}

	productTypeKey = GetKey(ProductType{}, productTypeKey)
	productType, err := ReadAsset[ProductType](ctx, productTypeKey)
	if err != nil {
		return err
	}

	if isApproved {
		productType.Status = Approved.String()
		productType.ApprovedOrgID = requestingOrgKey
	} else {
		productType.Status = Declined.String()
		productType.DeclinedOrgID = requestingOrgKey
	}

	productTypeBytes, err := json.Marshal(productType)
	if err != nil {
		return fmt.Errorf("failed to marshal the product type: %v", err)
	}

	err = ctx.GetStub().PutState(productType.ID, productTypeBytes)
	if err != nil {
		return fmt.Errorf("failed to approve or decline product type with ID %s: %v", productType.ID, err)
	}

	return nil
}

func (s *SmartContract) AddPackage(ctx contractapi.TransactionContextInterface, rawProductKey, productTypeKey, packageKey, packagedDateTime, expiryDate, unitOfMeasure string, amount float64) error {
	_, err := ValidateDateTime(packagedDateTime)
	if err != nil {
		return err
	}
	_, err = ValidateDateTime(expiryDate)
	if err != nil {
		return err
	}
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	//check role
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	isProcessor, err := CheckOrgRole(ctx, requestingOrgKey, Processor.String())
	if err != nil {
		return err
	}
	if !isProcessor {
		return fmt.Errorf("only organizations with the Processor role can add packages")
	}
	org, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	// check if the product type is approved
	productTypeKey = GetKey(ProductType{}, productTypeKey)
	productType, err := ReadAsset[ProductType](ctx, productTypeKey)
	if err != nil {
		return err
	}
	if productType.Status != Approved.String() {
		return fmt.Errorf("product type must be approved to add packages")
	}
	//check if rawProductKey is existed
	rawProductKey = GetKey(FarmProduct{}, rawProductKey)
	isExisted, err := s.AssetExists(ctx, rawProductKey)
	if err != nil {
		return err
	}
	if !isExisted {
		return fmt.Errorf("raw farm product is not existed")
	}

	newPackage := &Package{
		DocType:           PACKAGE_DOCTYPE,
		ID:                GetKey(Package{}, packageKey),
		RawProductID:      rawProductKey,
		ProductTypeID:     productTypeKey,
		ProductTypeName:   productType.Name,
		Brand:             productType.Brand,
		Status:            Packaged.String(),
		PackagedDateTime:  packagedDateTime,
		ExpiryDate:        expiryDate,
		UnitOfMeasure:     unitOfMeasure,
		Amount:            amount,
		LastShipmentID:    "",
		ProcessorOrgID:    requestingOrgKey,
		ProcessorName:     org.Name,
		CurrentOwnerOrgID: requestingOrgKey,
		CurrentOwnerName:  org.Name,
		SubmitterMSPID:    requestingOrg,
		SubmitterName:     org.Name,
		InvokedFunction:   "Add the package",
	}

	newPackageBytes, err := json.Marshal(newPackage)
	if err != nil {
		return fmt.Errorf("failed to marshal new package: %v", err)
	}

	err = ctx.GetStub().PutState(newPackage.ID, newPackageBytes)
	if err != nil {
		return fmt.Errorf("failed to store new package in world state for new package ID %s: %v", newPackage.ID, err)
	}

	return nil
}

func (s *SmartContract) AddShipment(ctx contractapi.TransactionContextInterface, shipmentKey, fromAddress, destinationAddress, startTime, processorOrgKey, retailerOrgKey string) error {
	_, err := ValidateDateTime(startTime)
	if err != nil {
		return err
	}
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	//check requester role
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	isDistributor, err := CheckOrgRole(ctx, requestingOrgKey, Distributor.String())
	if err != nil {
		return err
	}
	if !isDistributor {
		return fmt.Errorf("only organizations with the Distributor role can add shipments")
	}
	// check retailer role
	retailerOrgKey = GetKey(Organization{}, retailerOrgKey)
	isRetailer, err := CheckOrgRole(ctx, retailerOrgKey, Retailer.String())
	if err != nil {
		return err
	}
	if !isRetailer {
		return fmt.Errorf("retailerOrgKey does not have Retailer role")
	}
	// check processor role
	processorOrgKey = GetKey(Organization{}, processorOrgKey)
	isProcessor, err := CheckOrgRole(ctx, processorOrgKey, Processor.String())
	if err != nil {
		return err
	}
	if !isProcessor {
		return fmt.Errorf("processorOrgKey does not have Processor role")
	}

	newShipment := &Shipment{
		DocType:            SHIPMENT_DOCTYPE,
		ID:                 GetKey(Shipment{}, shipmentKey),
		Status:             Ready.String(),
		FromAddress:        fromAddress,
		DestinationAddress: destinationAddress,
		StartTime:          startTime,
		EndTime:            "",
		ProcessorOrgID:     processorOrgKey,
		RetailerOrgID:      retailerOrgKey,
		DistributorOrgID:   requestingOrgKey,
	}

	newShipmentBytes, err := json.Marshal(newShipment)
	if err != nil {
		return fmt.Errorf("failed to marshal new shipment: %v", err)
	}

	err = ctx.GetStub().PutState(newShipment.ID, newShipmentBytes)
	if err != nil {
		return fmt.Errorf("failed to store new shipment in world state for new shipment ID %s: %v", newShipment.ID, err)
	}

	return nil
}

func (s *SmartContract) LinkPackageWithShipment(ctx contractapi.TransactionContextInterface, shipmentKey, packageKey string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	requestingOrgKey := GetKey(Organization{}, requestingOrg)

	// check package
	packageKey = GetKey(Package{}, packageKey)
	updatedPackage, err := ReadAsset[Package](ctx, packageKey)
	if err != nil {
		return err
	}
	if updatedPackage.CurrentOwnerOrgID != requestingOrgKey {
		return fmt.Errorf("package must be owned by you")
	}

	// check shipment
	shipmentKey = GetKey(Shipment{}, shipmentKey)
	shipment, err := ReadAsset[Shipment](ctx, shipmentKey)
	if err != nil {
		return err
	}
	if shipment.Status != Ready.String() {
		return fmt.Errorf("shipment must be in Ready status")
	}

	submitter, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	//Update pakage
	updatedPackage.LastShipmentID = shipment.ID
	updatedPackage.SubmitterMSPID = requestingOrg
	updatedPackage.SubmitterName = submitter.Name
	updatedPackage.InvokedFunction = "Link Package with Shipment"
	updatedPackageBytes, err := json.Marshal(updatedPackage)
	if err != nil {
		return fmt.Errorf("failed to marshal the package: %v", err)
	}
	err = ctx.GetStub().PutState(updatedPackage.ID, updatedPackageBytes)
	if err != nil {
		return fmt.Errorf("failed to update package with ID %s: %v", updatedPackage.ID, err)
	}

	return nil
}

func (s *SmartContract) StartShipment(ctx contractapi.TransactionContextInterface, shipmentKey string) error {

	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	requestingOrgKey := GetKey(Organization{}, requestingOrg)

	// check shipment
	shipmentKey = GetKey(Shipment{}, shipmentKey)
	shipment, err := ReadAsset[Shipment](ctx, shipmentKey)
	if err != nil {
		return err
	}
	if shipment.Status != Ready.String() {
		return fmt.Errorf("shipment must be in Ready status")
	}

	submitter, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	queryString := fmt.Sprintf(`{
        "selector": {
            "docType": "%s",
            "lastShipmentId": "%s"
        }
    }`, PACKAGE_DOCTYPE, shipmentKey)

	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return fmt.Errorf("failed to get query result: %v", err)
	}
	defer resultsIterator.Close()

	// return error if there is no packages with the given LastShipmentID
	if !resultsIterator.HasNext() {
		return fmt.Errorf("no packages found with LastShipmentID: %s", shipmentKey)
	}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return fmt.Errorf("failed to iterate query results: %v", err)
		}

		var updatedPackage Package
		err = json.Unmarshal(queryResponse.Value, &updatedPackage)
		if err != nil {
			return fmt.Errorf("failed to unmarshal package json: %v", err)
		}

		if updatedPackage.CurrentOwnerOrgID != requestingOrgKey {
			return fmt.Errorf("package must be owned by you")
		}

		//Update pakage
		updatedPackage.Status = Shipping.String()
		updatedPackage.SubmitterMSPID = requestingOrg
		updatedPackage.SubmitterName = submitter.Name
		updatedPackage.InvokedFunction = "Start the shipment"

		updatedPkgJSON, err := json.Marshal(updatedPackage)
		if err != nil {
			return fmt.Errorf("failed to marshal updated package json: %v", err)
		}

		err = ctx.GetStub().PutState(updatedPackage.ID, updatedPkgJSON)
		if err != nil {
			return fmt.Errorf("failed to put updated package state: %v", err)
		}
	}

	//Update shipment
	shipment.Status = InTransit.String()
	shipmentBytes, err := json.Marshal(shipment)
	if err != nil {
		return fmt.Errorf("failed to marshal the shipment: %v", err)
	}
	err = ctx.GetStub().PutState(shipment.ID, shipmentBytes)
	if err != nil {
		return fmt.Errorf("failed to update shipment with ID %s: %v", shipment.ID, err)
	}
	return nil
}

func (s *SmartContract) TransferPackage(ctx contractapi.TransactionContextInterface, packageKey, newOrgKey string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	packageKey = GetKey(Package{}, packageKey)
	transferedPackage, err := ReadAsset[Package](ctx, packageKey)
	if err != nil {
		return err
	}
	//check current owner
	requestingOrgKey := GetKey(Organization{}, requestingOrg)
	if transferedPackage.CurrentOwnerOrgID != requestingOrgKey {
		return fmt.Errorf("only the current owner can initiate a transfer")
	}

	newOrgKey = GetKey(Organization{}, newOrgKey)
	newOrg, err := ReadAsset[Organization](ctx, GetKey(Organization{}, newOrgKey))
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", newOrgKey)
	}

	submitter, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	transferedPackage.SubmitterMSPID = requestingOrg
	transferedPackage.SubmitterName = submitter.Name
	transferedPackage.InvokedFunction = "Transfer the package"
	transferedPackage.CurrentOwnerOrgID = newOrgKey
	transferedPackage.CurrentOwnerName = newOrg.Name

	transferedPackageBytes, err := json.Marshal(transferedPackage)
	if err != nil {
		return fmt.Errorf("failed to marshal the package: %v", err)
	}

	err = ctx.GetStub().PutState(transferedPackage.ID, transferedPackageBytes)
	if err != nil {
		return fmt.Errorf("failed to transfer package with ID %s: %v", transferedPackage.ID, err)
	}

	return nil
}

func (s *SmartContract) EndShipment(ctx contractapi.TransactionContextInterface, shipmentKey string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	shipmentKey = GetKey(Shipment{}, shipmentKey)
	shipment, err := ReadAsset[Shipment](ctx, shipmentKey)
	if err != nil {
		return err
	}
	requestingOrgKey := GetKey(Organization{}, requestingOrg)

	if shipment.Status != InTransit.String() || shipment.DistributorOrgID != requestingOrgKey {
		return fmt.Errorf("shipment must be InTransit and initiated by you")
	}

	shipment.Status = Done.String()
	shipment.EndTime = GetDateTimeAsString(time.Now())

	shipmentBytes, err := json.Marshal(shipment)
	if err != nil {
		return fmt.Errorf("failed to marshal the shipment: %v", err)
	}

	err = ctx.GetStub().PutState(shipment.ID, shipmentBytes)
	if err != nil {
		return fmt.Errorf("failed to end shipment with ID %s: %v", shipment.ID, err)
	}

	return nil
}

func (s *SmartContract) UpdatePackageStatus(ctx contractapi.TransactionContextInterface, packageKey, status string) error {
	// Get submitter MSP ID
	requestingOrg, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return err
	}
	packageKey = GetKey(Package{}, packageKey)
	updatedPackage, err := ReadAsset[Package](ctx, packageKey)
	if err != nil {
		return err
	}

	packageStatus, err := GetPackageStatus(status)
	if err != nil {
		return err
	}

	requestingOrgKey := GetKey(Organization{}, requestingOrg)

	if updatedPackage.CurrentOwnerOrgID != requestingOrgKey {
		return fmt.Errorf("only the current owner can update the package status")
	}

	submitter, err := ReadAsset[Organization](ctx, requestingOrgKey)
	if err != nil {
		return fmt.Errorf("there is no organization with the key %s", requestingOrgKey)
	}

	updatedPackage.SubmitterMSPID = requestingOrg
	updatedPackage.SubmitterName = submitter.Name
	updatedPackage.InvokedFunction = "Update the status of the package"
	updatedPackage.Status = packageStatus.String()

	packageBytes, err := json.Marshal(updatedPackage)
	if err != nil {
		return fmt.Errorf("failed to marshal the package: %v", err)
	}

	err = ctx.GetStub().PutState(updatedPackage.ID, packageBytes)
	if err != nil {
		return fmt.Errorf("failed to update package with ID %s: %v", updatedPackage.ID, err)
	}

	return nil
}

func (s *SmartContract) TraceProvenance(ctx contractapi.TransactionContextInterface, packageKey string) (*CombinedHistory, error) {
	// Retrieve package history using the package ID
	packageKey = GetKey(Package{}, packageKey)
	packageHistory, err := s.GetPackageHistory(ctx, packageKey)
	if err != nil {
		return nil, err
	}

	// Get raw product key from the package history (you can extract it from the first package, for example)
	var rawProductKey string
	if len(packageHistory) > 0 {
		rawProductKey = packageHistory[0].Record.RawProductID // Assume the first record contains the raw product key
	}

	// Prepare to retrieve the raw product history if a RawProductID is present.
	rawProductHistory, err := s.GetFarmProductHistory(ctx, rawProductKey)
	if err != nil {
		return nil, err
	}

	// Combine both histories into one response structure.
	result := CombinedHistory{
		PackageHistory:    packageHistory,
		RawProductHistory: rawProductHistory,
	}

	return &result, nil
}

func (s *SmartContract) InitializeSystem(ctx contractapi.TransactionContextInterface) error {

	err := s.InitializeOrganizationAndRole(ctx, "regulatoryDepartmentMSP", "Regulatory Department", "Viet Nam", RegulatoryDepartment)
	if err != nil {
		return err
	}

	// err = s.InitializeOrganizationAndRole(ctx, "farmMSP", "A farm", "A City", Farm)
	// if err != nil {
	// 	return err
	// }

	// err = s.InitializeOrganizationAndRole(ctx, "processorMSP", "A processor", "A City", Processor)
	// if err != nil {
	// 	return err
	// }

	// err = s.InitializeOrganizationAndRole(ctx, "distributorMSP", "A distributor", "A City", Distributor)
	// if err != nil {
	// 	return err
	// }

	// err = s.InitializeOrganizationAndRole(ctx, "retailerMSP", "A retailer", "A City", Retailer)
	// if err != nil {
	// 	return err
	// }

	return nil
}

// ///////////////////////////////////////////////////// Main ///////////////////////////////////////////////////////
func main() {
	chaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating asset chaincode: %v", err)
	}

	if err := chaincode.Start(); err != nil {
		log.Panicf("Error starting asset chaincode: %v", err)
	}
}
