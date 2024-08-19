import "package:flutter/material.dart";

class Event {
  final int? id;
  final String description;
  final String date;
  final String teacherId;
  String? teacherName;

  Event({required this.description, required this.date, required this.teacherId, this.teacherName,  this.id});

    factory Event.fromJson(Map<String, dynamic> json) {
      return Event(
        description: json['DESCRIPTION'].toString(),
        date: json['DATA'].toString(),
        teacherId: json['RA_TEACH'].toString(),
        id: json['ID']

        );

    }


}