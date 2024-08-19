import 'package:flutter/material.dart';

class StudentInvoice {
  final String id;
  final String rastud;
  final double amount;
  final DateTime dueDate;

  StudentInvoice({
    required this.id,
    required this.rastud,
    required this.amount,
    required this.dueDate,
  });

  factory StudentInvoice.fromJson(Map<String, dynamic> json) {
    return StudentInvoice(
      id: json['id'],
      rastud: json['rastud'],
      amount: json['amount'],
      dueDate: DateTime.parse(json['dueDate']),
    );
  }
}
