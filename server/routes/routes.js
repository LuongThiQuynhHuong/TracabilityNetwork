const express = require("express");
const fs = require('fs');
const { clientApplication } = require("./client");

const constants = require("../utils/contants")
const { formatGrpcErrorMessage } = require('../utils/formatError');

const router = express.Router();
const userClient = new clientApplication();

//InitializeSystem
router.post(constants.API_ENDPOINT.INITIALIZE_SYSTEM, async (req, res) => {
  try {
    const organization = "regulatoryDepartment"
    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.INITIALIZE_SYSTEM,
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Initialize system successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error initialize system:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error initialize system!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//AddNewOrganization
router.post(constants.API_ENDPOINT.ADD_NEW_ORG, async (req, res) => {
  try {
    const { organization, orgKey, name, address } = req.body;

    if (!organization || !orgKey || !name || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.ADD_NEW_ORG,
      orgKey,
      name,
      address
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Organization added successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error adding organization:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error adding organization!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//RegisterOrgRole
router.post(constants.API_ENDPOINT.REGISTER_ORG_ROLE, async (req, res) => {
  try {
    const { organization, role, orgKey } = req.body;

    if (!organization || !role || !orgKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.REGISTER_ORG_ROLE,
      role,
      orgKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Organization role registered successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error registering organization role:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error registering organization role!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//AddFarmProduct
router.post(constants.API_ENDPOINT.ADD_FARM_PRODUCT, async (req, res) => {
  try {
    const { organization, farmProductKey, name, unitOfMeasure, amount } = req.body;

    if (!organization || !farmProductKey || !name || !unitOfMeasure || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.ADD_FARM_PRODUCT,
      farmProductKey,
      name,
      unitOfMeasure,
      amount.toString()
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Farm product added successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error adding farm product:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error adding farm product!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//UpdateFarmProductStatus
router.post(constants.API_ENDPOINT.UPDATE_FARM_PRODUCT_STATUS, async (req, res) => {
  try {
    const { organization, farmProductKey, newStatus } = req.body;

    if (!organization || !farmProductKey || !newStatus) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.UPDATE_FARM_PRODUCT_STATUS,
      farmProductKey,
      newStatus
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Farm product status updated successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error updating farm product status:", error);
    const errorMessage = formatGrpcErrorMessage(error, "Error updating farm product status!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//TransferFarmProduct
router.post(constants.API_ENDPOINT.TRANSFER_FARM_PRODUCT, async (req, res) => {
  try {
    const { organization, farmProductKey, newOrgKey } = req.body;

    if (!organization || !farmProductKey || !newOrgKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.TRANSFER_FARM_PRODUCT,
      farmProductKey,
      newOrgKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Farm product transfered successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error transfering farm product:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error transfering farm product!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//RegisterProductType
router.post(constants.API_ENDPOINT.REGISTER_PRODUCT_TYPE, async (req, res) => {
  try {
    const { organization, name, brand } = req.body;

    if (!organization || !name || !brand) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.REGISTER_PRODUCT_TYPE,
      name,
      brand
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Register product type request sent successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error sending register product type request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error sending register product type request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//ApproveProductType
router.post(constants.API_ENDPOINT.APPROVE_PRODUCT_TYPE, async (req, res) => {
  const { organization, productTypeKey, isApproved } = req.body;

  try {
    if (!organization || !productTypeKey || typeof isApproved !== 'boolean') {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.APPROVE_PRODUCT_TYPE,
      productTypeKey,
      isApproved.toString()
    );

    res
      .status(201)
      .json({
        success: true,
        message: isApproved ? "Product type approved successfully!" : "Product type declined successfully!",
        data: { result },
      });
  } catch (error) {
    console.error(isApproved ? "Error approving product type request:" : "Error rejecting product type request:", error);

    const errorMessage = formatGrpcErrorMessage(error, isApproved ? "Error approving product type request!" : "Error rejecting product type request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//AddPackage
router.post(constants.API_ENDPOINT.ADD_PACKAGE, async (req, res) => {
  try {
    const { organization, rawProductKey, productTypeKey, packageKey, packagedDateTime, expiryDate, unitOfMeasure, amount } = req.body;

    if (!organization || !rawProductKey || !productTypeKey || !packageKey || !packagedDateTime || !expiryDate || !unitOfMeasure || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.ADD_PACKAGE,
      rawProductKey,
      productTypeKey,
      packageKey,
      packagedDateTime,
      expiryDate,
      unitOfMeasure,
      amount.toString()
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Package added successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error adding package request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error adding package request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//AddShipment
router.post(constants.API_ENDPOINT.ADD_SHIPMENT, async (req, res) => {
  try {
    const { organization, shipmentKey, fromAddress, destinationAddress, startTime, processorOrgKey, retailerOrgKey } = req.body;

    if (!organization || !shipmentKey || !fromAddress || !destinationAddress || !startTime || !processorOrgKey || !retailerOrgKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.ADD_SHIPMENT,
      shipmentKey,
      fromAddress,
      destinationAddress,
      startTime,
      processorOrgKey,
      retailerOrgKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Shipment added successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error adding shipment request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error adding shipment request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//LinkPackageWithShipment
router.post(constants.API_ENDPOINT.LINK_PACKAGE_WITH_SHIPMENT, async (req, res) => {
  try {
    const { organization, shipmentKey, packageKey } = req.body;

    if (!organization || !shipmentKey || !packageKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.LINK_PACKAGE_WITH_SHIPMENT,
      shipmentKey,
      packageKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Package is linked successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error linking package request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error linking package request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//StartShipment
router.post(constants.API_ENDPOINT.START_SHIPMENT, async (req, res) => {
  try {
    const { organization, shipmentKey } = req.body;

    if (!organization || !shipmentKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.START_SHIPMENT,
      shipmentKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Shipment started successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error starting shipment request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error starting shipment request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//TransferPackage
router.post(constants.API_ENDPOINT.TRANSFER_PACKAGE, async (req, res) => {
  try {
    const { organization, packageKey, newOrgKey } = req.body;

    if (!organization || !packageKey || !newOrgKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.TRANSFER_PACKAGE,
      packageKey,
      newOrgKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Package transfered successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error transfering package request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error transfering package request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//EndShipment
router.post(constants.API_ENDPOINT.END_SHIPMENT, async (req, res) => {
  try {
    const { organization, shipmentKey } = req.body;

    if (!organization || !shipmentKey) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.END_SHIPMENT,
      shipmentKey
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Shipment finished successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error finishing shipment request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error finishing shipment request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//UpdatePackageStatus
router.post(constants.API_ENDPOINT.UPDATE_PACKAGE_STATUS, async (req, res) => {
  try {
    const { organization, packageKey, status } = req.body;

    if (!organization || !packageKey || !status) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.INVOKE_TXN,
      constants.HLF_TRANSACTION_NAME.UPDATE_PACKAGE_STATUS,
      packageKey,
      status
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Package status updated successfully!",
        data: { result },
      });
  } catch (error) {
    console.error("Error updating package status request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error updating package status request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//TraceProvenance
router.post(constants.API_ENDPOINT.TRACE_PROVENANCE, async (req, res) => {
  try {
    const { organization, packageKey } = req.body;

    if (!organization || !packageKey ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    let orgClient = new clientApplication();

    const result = await orgClient.submitTxn(
      organization,
      constants.HLF_CONSTANTS.CHANNEL_NAME,
      constants.HLF_CONSTANTS.CHAINCODE_NAME,
      constants.HLF_CONSTANTS.CONTRACT_NAME,
      constants.HLF_TRANSACTION_TYPE.QUERY_TXN,
      constants.HLF_TRANSACTION_NAME.TRACE_PROVENANCE,
      packageKey
    );

    const buffer = Buffer.from(result);
    const decoded = JSON.parse(buffer.toString('utf8'));

    res
      .status(201)
      .json({
        success: true,
        message: "Tracing provenance successfully!",
        data: decoded,
      });
  } catch (error) {
    console.error("Error tracing provenance request:", error);

    const errorMessage = formatGrpcErrorMessage(error, "Error tracing provenance request!");

    res.status(500).json({
      success: false,
      message: errorMessage,
      data: { error: error.message },
    });
  }
});

//test server
router.post("/test", async (req, res) => {
  try {
    const { organization} = req.body;

    if (!organization) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    res
      .status(201)
      .json({
        success: true,
        message: `Request from ${organization} received successfully!`,
        data: JSON.parse(fs.readFileSync('./utils/testData.json', 'utf8')),
      });
  } catch (error) {
    console.error("Error tracing provenance request:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error tracing provenance request!",
        data: { error: error.message },
      });
  }
});

module.exports = router;
