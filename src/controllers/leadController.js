import Lead from '../models/leadModel.js'
import User from '../models/userModel.js'
export const createLead = async (req, res) => {
  try {
    // console.log(req.user);
    if (req.user.role === 'caller') {
      return res.status(403).json({
        success: false,
        message: 'Callers are not allowed to create leads',
      });
    }

    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required fields',
      });
    }

    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("category")
      .populate("assignedTo", "username email role ");

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("category")
      .populate("assignedTo");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignLead = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    // Check Caller
    const assignedToUser = await User.findById(assignedTo);
    console.log(assignedToUser);
    if (!assignedToUser) {
      return res.status(404).json({
        success: false,
        message: "Caller not found",
      });
    }

    if (assignedToUser.role !== "caller") {
      return res.status(400).json({
        success: false,
        message: "Lead can only be assigned to a caller",
      });
    }

    // Check Lead
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.assignedTo = assignedTo;
    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 export const updateLeadStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (
      req.user.role === "caller" &&
      lead.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You can update only your assigned leads",
      });
    }

    lead.status = status;
    lead.remarks = remarks;

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};