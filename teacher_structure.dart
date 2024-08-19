import "package:flutter/material.dart";


class Teacher {
  String id;
  String fullname;
  String email;

  Teacher({required this.id, required this.fullname, required this.email});


factory Teacher.fromJson(Map<String, dynamic> json) {
  return Teacher(
    id: json['RATEACH']?.toString() ?? '',
    fullname: json['FULLNAME']?.toString() ?? '', // Convert to String if not already a String
    email: json['EMAIL']?.toString() ?? '', // Convert to String if not already a String
      );
}

}