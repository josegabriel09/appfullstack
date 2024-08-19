
import 'package:flutter/material.dart';

class StudentGrades {
  final int? id;
  final String? rastud;
  final String? linguaPortuguesa;
  final String? artes;
  final String? educacaoFisica;
  final String? matematica;
  final String? biologia;
  final String? fisica;
  final String? quimica;
  final String? historia;
  final String? geografia;
  final String? filosofia; // Add property for 'FILOSOFIA'
  final String? sociologia;
  final String? eletiva;
  final String? resultado;

List<String> subjectNames =  ["Língua Portuguesa", "Artes", "Educação Física", "Matemática", "Biologia", "Física", "Química", "História", "Geografia", "Filosofia", "Sociologia", "Eletiva", "Resultado"];

  StudentGrades(
    { this.id,
      this.rastud,
     this.linguaPortuguesa,
    this.artes,
    this.educacaoFisica,
    this.matematica,
    this.biologia,
    this.fisica,
    this.quimica,
    this.historia,
    this.geografia,
    this.filosofia,
    this.sociologia,
    this.eletiva,
     this.resultado}
  );

  factory StudentGrades.fromJson(Map<String, dynamic> json) {
  return StudentGrades(
    id: json['ID'],
    rastud: json['RASTUD'] ?? '',
    linguaPortuguesa: json['LINGUA_PORTUGUESA']?.toString() ?? '', // Convert to String if not already a String
    artes: json['ARTES']?.toString() ?? '', // Convert to String if not already a String
    educacaoFisica: json['EDUCACAO_FISICA']?.toString() ?? '', // Convert to String if not already a String
    matematica: json['MATEMATICA']?.toString() ?? '', // Convert to String if not already a String
    biologia: json['BIOLOGIA']?.toString() ?? '', // Convert to String if not already a String
    fisica: json['FISICA']?.toString() ?? '', // Convert to String if not already a String
    quimica: json['QUIMICA']?.toString() ?? '', // Convert to String if not already a String
    historia: json['HISTORIA']?.toString() ?? '', // Convert to String if not already a String
    geografia: json['GEOGRAFIA']?.toString() ?? '', // Convert to String if not already a String
    filosofia: json['FILOSOFIA']?.toString() ?? '',
    sociologia: json['SOCIOLOGIA']?.toString() ?? '', // Convert to String if not already a String
    eletiva: json['ELETIVA']?.toString() ?? '', // Convert to String if not already a String
    resultado: json['RESULTADO']?.toString() ?? '', // Convert to String if not already a String
  );
}


  Map<String, dynamic> toJson() {
    return {
      'ID': id,
      'RASTUD': rastud,
      'LINGUA_PORTUGUESA': linguaPortuguesa,
      'ARTES': artes,
      'EDUCACAO_FISICA': educacaoFisica,
      'MATEMATICA': matematica,
      'BIOLOGIA': biologia,
      'FISICA': fisica,
      'QUIMICA': quimica,
      'HISTORIA': historia,
      'GEOGRAFIA': geografia,
      'FILOSOFIA' : filosofia,
      'SOCIOLOGIA': sociologia,
      'ELETIVA': eletiva,
      'RESULTADO': resultado,
    };
  }
}
