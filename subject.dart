import "package:flutter/material.dart";

class Subject {
  final int id;
  final String subjectName;
  final String raTeach;
  final String idClass;
  String? teacherName;
  String? className;


  Subject({required this.subjectName, required this.raTeach, required this.idClass, this.teacherName, this.className, required this.id});

    factory Subject.fromJson(Map<String, dynamic> json) {
      return Subject(
        subjectName: json['MATTER'].toString(),
        raTeach: json['RA_TEACH'].toString(),
        idClass: json['ID_CLASS'].toString(),
        id: json['ID']

        );

    }

}