const invoiceService = require("../services/invoiceService");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Diretório onde os comprovantes serão armazenados
const fs = require('fs');

const sendPaymentConfirmation = async (req, res) => {
  const { id } = req.params;

  // Verificar se a fatura existe
  const invoice = await invoiceService.getInvoiceById(id);
  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  const processarComprovante = async (comprovante) => {
    // Verificar se foi enviado um comprovante
    if (!comprovante) {
      throw new Error('Comprovante de pagamento não encontrado');
    }
  
    // Gerar um nome único para o arquivo com base no timestamp atual
    const nomeArquivo = `${Date.now()}_${comprovante.originalname}`;
  
    try {
      // Salvar o arquivo no diretório desejado
      await fs.promises.writeFile(`uploads/${nomeArquivo}`, comprovante.buffer);
  
      // Realizar qualquer outra lógica necessária com o comprovante
      console.log('Comprovante de pagamento salvo com sucesso:', nomeArquivo);
  
      // Retornar o nome do arquivo salvo
      return nomeArquivo;
    } catch (error) {
      console.error('Erro ao processar comprovante de pagamento:', error);
      throw error;
    }
  };

  // Utilização da função processarComprovante:
  try {
    const nomeArquivoSalvo = await processarComprovante(req.file);
    console.log('Nome do arquivo salvo:', nomeArquivoSalvo);
    
    // resposta após o processamento completo
    res.json({ message: "Payment confirmation sent successfully" });
  } catch (error) {
    console.error('Erro ao processar o comprovante de pagamento:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let getAllInvoices = async (req, res) => {
  console.log("entrou aq")
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await invoiceService.getInvoiceById(id);
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let createInvoice = async (req, res) => {
  const { rastud, amount, dueDate, pixKey, pixQRCode } = req.body;

  if (!rastud || !amount || !dueDate || !pixKey || !pixQRCode) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const createdInvoiceId = await invoiceService.createInvoice(
      rastud,
      amount,
      dueDate,
      pixKey,
      pixQRCode
    );

    res
      .status(201)
      .json({ message: "Invoice created successfully", id: createdInvoiceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { amount, dueDate } = req.body;

  if (!amount || !dueDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Verificar se o valor numérico é válido
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const updated = await invoiceService.updateInvoice(id, amount, dueDate);
    if (updated) {
      res.json({ message: "Invoice updated successfully" });
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await invoiceService.deleteInvoice(id);
    if (deleted) {
      res.json({ message: "Invoice deleted successfully" });
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllInvoices: getAllInvoices,
  getInvoiceById: getInvoiceById,
  createInvoice: createInvoice,
  updateInvoice: updateInvoice,
  deleteInvoice: deleteInvoice,
  sendPaymentConfirmation: sendPaymentConfirmation,
};
