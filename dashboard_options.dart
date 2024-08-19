import 'package:flutter/material.dart';

// Define a class to represent a dashboard menu option
class DashboardOption {
  final IconData icon;
  final String title;

  DashboardOption({required this.icon, required this.title});
}

class StudentsDashboardItems {
  List<DashboardOption> presetOptions = [
    DashboardOption(icon: Icons.school, title: 'Minhas notas'),
    DashboardOption(icon: Icons.person_outlined, title: 'Professores'),
    DashboardOption(icon: Icons.attach_money, title: 'Financeiro'),
    DashboardOption(icon: Icons.calendar_month, title: 'Eventos'),
    DashboardOption(icon: Icons.article, title: 'Feed'), // Adicionando o "Meu Feed"
    // Add more preset options as needed
  ];
}

class StaffDashboardItems {
  List<DashboardOption> presetOptions1stRow = [
    DashboardOption(icon: Icons.school, title: 'Adicionar turma'),
    DashboardOption(icon: Icons.person_outlined, title: 'Adicionar aluno'),
    DashboardOption(icon: Icons.manage_accounts, title: 'Adicionar admin'),
    DashboardOption(icon: Icons.money_sharp, title: 'Adicionar \npagamentos'),
    DashboardOption(icon: Icons.class_, title: 'Adicionar professor'),
    DashboardOption(icon: Icons.library_books, title: 'Adicionar matéria'),
    DashboardOption(icon: Icons.grade, title: 'Adicionar notas'),
    DashboardOption(icon: Icons.calendar_month, title: 'Adicionar evento'),
    DashboardOption(icon: Icons.article, title: 'Meu Feed'), // Adicionando o "Meu Feed"
  ];


List<DashboardOption> presetOptions2ndRow = [

    DashboardOption(icon: Icons.grade, title: 'Editar notas'),
    DashboardOption(icon: Icons.school, title: 'Editar turma'),
    DashboardOption(icon: Icons.class_, title: 'Editar professor'),
    DashboardOption(icon: Icons.manage_accounts, title: 'Editar admin'),
    DashboardOption(icon: Icons.library_books, title: 'Editar matéria'),
    DashboardOption(icon: Icons.person_outlined, title: 'Editar aluno'),
    DashboardOption(icon: Icons.calendar_month, title: 'Editar evento'),
    DashboardOption(icon: Icons.money_rounded, title: 'Editar \npagamentos'),


  ];

}

class ClassDashboardItems {
  List<DashboardOption> presetOptions = [
    DashboardOption(icon: Icons.school, title: 'Minhas notas'),
    DashboardOption(icon: Icons.person_outlined, title: 'Professores')


  ];
}