import 'package:flutter/material.dart';
import 'package:eduvision_client/model/events.dart';
import 'package:eduvision_client/services/events_api_service.dart';
import 'package:eduvision_client/model/teacher_structure.dart';
import 'package:eduvision_client/services/teacher_api_service.dart';

class ShowEventsScreen extends StatefulWidget {
  @override
  _ShowEventsScreenState createState() => _ShowEventsScreenState();
}

class _ShowEventsScreenState extends State<ShowEventsScreen> {
  late List<Event> _events = [];

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    try {
      List<Event> events = await EventsAPIService().getEvents();
      for (Event event in events) {
        // Fetch the teacher's name for each event
        String teacherName = await _fetchTeacherName(event.teacherId);
        event.teacherName = teacherName;
      }
      setState(() {
        _events = events;
      });
    } catch (error) {
      print('Error fetching events: $error');
    }
  }

  Future<String> _fetchTeacherName(String teacherId) async {
    try {
      // Assuming you have a method in your teachers API service to fetch teacher by ID
      Teacher teacher = await TeacherAPIService().getTeacherByRatech(teacherId);
      return teacher.fullname; // Assuming 'fullname' is the name field in your Teacher model
    } catch (error) {
      print('Error fetching teacher: $error');
      return ''; // Return an empty string in case of error
    }
  }

  void _showEventDetailsDialog(Event event) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Evento'),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Descrição do evento: ${event.description}'),
                Text('Data: ${event.date}'),
                Text(
                  'Professor responsável: ${event.teacherName ?? "Não especificado"}',
                ),
                // Add more fields as needed
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('Fechar'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Eventos'),
      ),
      body: _events.isNotEmpty
          ? ListView.builder(
              itemCount: _events.length,
              itemBuilder: (context, index) {
                return Card(
                  elevation: 5, // Adicionando sombra ao cartão
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  color: Theme.of(context).cardColor, // Use the card color from the theme
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12), // Adicionando bordas arredondadas ao cartão
                  ),
                  child: ListTile(
                    title: Text(_events[index].description),
                    subtitle: Text(
                      _events[index].teacherName ?? "Sem professor",
                    ),
                    onTap: () {
                      _showEventDetailsDialog(_events[index]);
                    },
                  ),
                );
              },
            )
          : Center(
              child: CircularProgressIndicator(),
            ),
    );
  }
}
