// @des Get all contacts
// @routes GET /api/contacts  
//access public
const getContacts = (req,res) =>{
    res.status(200).json({message: "Get all contacts"})
}


// @des Create new contact
// @routes POST /api/contacts  
//access public
const createContact = (req,res) =>{
    console.log("The request body is :",req.body);
    res.status(200).json({message: "create contacts"})
}


// @des Get Individualcontact
// @routes GET /api/contacts/:id 
//access public
const getContact = (req,res) =>{
    res.status(200).json({message: `Get contact for ${req.params.id}`})
}

// @des Update Individualcontact
// @routes PUT /api/contacts/:id 
//access public
const updateContact = (req,res) =>{
    res.status(200).json({message: `Update contact for ${req.params.id}`})
}

// @des delete Individualcontact
// @routes DELETE /api/contacts/:id 
//access public
const deleteContact = (req,res) =>{
    res.status(200).json({message: `elete contact for ${req.params.id}`})
}


module.exports = { getContacts,createContact, getContact,updateContact,deleteContact}