// import "dart:ffi";
import "package:flutter/material.dart";


class ClassesStructure {
  String idClass;
  String className;
  String letter;
  String modality;

  ClassesStructure({required this.idClass, required this.className, required this.letter, required this.modality});


factory ClassesStructure.fromJson(Map<String, dynamic> json) {
  return ClassesStructure(
    idClass: json['IDCLASS']?.toString() ?? '',
    className: json['CLASSNAME']?.toString() ?? '', // Convert to String if not already a String
    letter: json['LETTER']?.toString() ?? '', // Convert to String if not already a String
    modality: json['MODALITY']?.toString() ?? '', // Convert to String if not already a String
      );
}

}