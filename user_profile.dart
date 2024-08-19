import 'package:flutter/material.dart';


class UserProfile {
  final String id;
  final String? email;
  final String? role;
  final String name;
  final int? idClass;
  final String? occupation;


  UserProfile({required this.id, this.email, this.role, required this.name, this.idClass, this.occupation});
  
  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['RASTUD'] ?? json['RACOLLAB'].toString(),
      idClass: json['ID_CLASS'],
      name: json['FULLNAME'].toString(),
      email: json['EMAIL'].toString(),
      role: json['ROLE'].toString()
    );
  } 

  @override
  String toString() {
    return 'UserProfile{id: $id, email: $email, role: $role, name: $name, idClass: $idClass, occupation: $occupation}';
  }

}