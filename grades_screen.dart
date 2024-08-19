import 'package:flutter/material.dart';
import 'package:eduvision_client/model/student_grades.dart';
import 'package:eduvision_client/services/grades_api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GradesScreen extends StatefulWidget {
  String? RASTUD;

  GradesScreen({this.RASTUD});

  @override
  _GradesScreenState createState() => _GradesScreenState();
}

class _GradesScreenState extends State<GradesScreen> {
  List<StudentGrades> grades = [];

  @override
  void initState() {
    super.initState();
    fetchGrades(); // Fetch grades when the screen initializes
  }

  Future<void> fetchGrades() async {
    // Call your API service method to fetch grades
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      widget.RASTUD = prefs.getString('rastud')!;

      List<StudentGrades> fetchedGrades = await GradesAPIService().fetchNotesByRASTUD(widget.RASTUD ?? "");
      setState(() {
        grades = fetchedGrades;
      });
    } catch (error) {
      print('Error fetching grades: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notas do(a) Estudante - ${widget.RASTUD}'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Card(
          elevation: 8,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          child: Padding(
            padding: EdgeInsets.all(16),
            child: ListView(
              children: [
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: DataTable(
                    columns: _buildColumns(),
                    rows: _buildRows(),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<DataColumn> _buildColumns() {
    if (grades.isEmpty) return [DataColumn(label: Text('Ainda sem dados...'))]; // Return empty list if grades is empty

    List<DataColumn> columns = [
      DataColumn(label: Text('Matéria')),
    ];

    // Add a DataColumn for each attribute
    for (int i = 1; i <= grades.length; i++) {
      columns.add(DataColumn(label: Text('Nota $i')));
    }

    return columns;
  }

  List<DataRow> _buildRows() {
    if (grades.isEmpty) return []; // Return empty list if grades is empty

    // Ensure that all grades have the same keys
    Set<String> allKeys = {};
    grades.forEach((grade) => allKeys.addAll(grade.toJson().keys));

    List<DataRow> rows = [];
    for (String key in allKeys) {
      List<DataCell> cells = [];
      if (key != "RASTUD") {
        cells = [
          DataCell(Text(key, style: TextStyle(color: Colors.black))), // Subject
        ];
      }

      for (StudentGrades grade in grades) {
        if (key != "RASTUD") {
          cells.add(DataCell(Text(grade.toJson()[key]?.toString() ?? '', style: TextStyle(color: Colors.black))));
        }
      }
      // Ensure that the row has the same number of cells as there are header cells
      while (cells.length < _buildColumns().length) {
        cells.add(DataCell(Text('', style: TextStyle(color: Colors.black))));
      }
      rows.add(DataRow(cells: cells));
    }
    return rows;
  }
}
