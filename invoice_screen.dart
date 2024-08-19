import 'package:flutter/material.dart';
import 'package:eduvision_client/model/student_invoice.dart';
import 'package:eduvision_client/services/invoice_api_service.dart';

class InvoiceScreen extends StatefulWidget {
  @override
  _InvoiceScreenState createState() => _InvoiceScreenState();
}

class _InvoiceScreenState extends State<InvoiceScreen> {
  final _invoiceService = InvoiceAPIService();
  late Future<List<StudentInvoice>> _invoices;

  @override
  void initState() {
    super.initState();
    _invoices = _invoiceService.getAllInvoices();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Financeiro'),
      ),
      body: FutureBuilder<List<StudentInvoice>>(
        future: _invoices,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erro: ${snapshot.error}'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return Card(
                  elevation: 5,
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  color: Colors.white, // Use default white color
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: ListTile(
                    title: Text(
                      'Fatura #${snapshot.data![index].id}',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.black, // Use default black color
                      ),
                    ),
                    subtitle: Text(
                      'Amount: ${snapshot.data![index].amount}',
                    ),
                    onTap: () {
                      // Handle invoice tap
                    },
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
