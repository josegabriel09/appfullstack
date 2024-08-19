import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class InvoiceListScreen extends StatefulWidget {
  @override
  _InvoiceListScreenState createState() => _InvoiceListScreenState();
}

class _InvoiceListScreenState extends State<InvoiceListScreen> {
  List<dynamic> invoices = [];

  @override
  void initState() {
    super.initState();
    fetchInvoices();
  }

  Future<void> fetchInvoices() async {
    final response = await http.get(Uri.parse('http://localhost:3000/invoices'));
    if (response.statusCode == 200) {
      setState(() {
        invoices = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load invoices');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Invoice List'),
      ),
      body: ListView.builder(
        itemCount: invoices.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text('Invoice ${invoices[index]['id']}'),
          );
        },
      ),
    );
  }
}
