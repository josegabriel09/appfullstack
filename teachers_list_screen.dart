import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/teacher_api_service.dart';
import '../model/teacher_structure.dart';

class TeacherListScreen extends StatefulWidget {
  @override
  _TeacherListScreenState createState() => _TeacherListScreenState();
}

class _TeacherListScreenState extends State<TeacherListScreen> {
  final TeacherAPIService _teacherAPIService = TeacherAPIService();
  late List<dynamic> _teacherMatters = [];

  @override
  void initState() {
    super.initState();
    _fetchTeacherMatters();
  }

  Future<void> _fetchTeacherMatters() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    int? idClass = prefs.getInt('idClass');
    if (idClass != null) {
      try {
        List<dynamic> teacherMatters = await _teacherAPIService.fetchTeacherMatters(idClass.toString());
        setState(() {
          _teacherMatters = teacherMatters;
        });
      } catch (e) {
        print('Error fetching teacher matters: $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Professores'),
      ),
      body: _teacherMatters.isEmpty
          ? Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: _teacherMatters.length,
              itemBuilder: (BuildContext context, int index) {
                Map<String, dynamic> teacherMatter = _teacherMatters[index];
                return _buildTeacherCard(teacherMatter);
              },
            ),
    );
  }

  Widget _buildTeacherCard(Map<String, dynamic> teacherMatter) {
    return Card(
      margin: EdgeInsets.all(8.0),
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: BorderSide(color: Colors.white, width: 2), // Adicionando borda branca ao redor do cartão
      ),
      child: ListTile(
        title: Text(
          teacherMatter['FULLNAME'],
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              teacherMatter['EMAIL'],
              style: TextStyle(fontSize: 14),
            ),
            SizedBox(height: 4),
            Text(
              'Matéria: ${teacherMatter['MATTER']}',
              style: TextStyle(fontSize: 14),
            ),
            SizedBox(height: 4),
            Text(
              'Turma: ${teacherMatter['CLASSNAME']} - ${teacherMatter['LETTER']}',
              style: TextStyle(fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }
}
