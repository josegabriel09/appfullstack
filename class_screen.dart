import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:eduvision_client/model/dashboard_options.dart';
import 'package:eduvision_client/services/navigation_service.dart'; // Import the NavigatorService


class ClassDashboardScreen extends StatelessWidget {
  final String? fullName;
  final String? studentClass;
  final String? occupation;

  ClassDashboardScreen({required this.fullName, this.studentClass, this.occupation});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Dashboard',
              style: TextStyle(fontSize: 20),
            ),
            SizedBox(height: 4),
            Text(
              'Nome: $fullName',
              style: TextStyle(fontSize: 14),
            ),
            Text(
              'Classe: $studentClass',
              style: TextStyle(fontSize: 14),
            ),
            SizedBox(height: 4), // Adjust spacing between icon and text
          ],
        ),
        centerTitle: false, // Align title and other attributes to the left
      ),
      body: Container(
        padding: EdgeInsets.all(16), // Padding for spacing
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // First grid with title
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Recursos',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Align(
                  alignment: Alignment.centerLeft,
                  child: FutureBuilder<List<DashboardOption>>(
                    future: _getDashboardOptions(), // Get options from shared preferences
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return CircularProgressIndicator(); // Show loading indicator while fetching data
                      } else if (snapshot.hasError) {
                        return Text('Error: ${snapshot.error}'); // Show error message if an error occurs
                      } else {
                        return GridView.count(
                          crossAxisCount: 3,
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          children: snapshot.data!.map((option) {
                            return GestureDetector(
                              onTap: () {
                                // Navigate to the selected screen
                                NavigatorService.navigateToScreen(context, option.title);
                              },
                              child: Card(
                                elevation: 3,
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      option.icon,
                                      size: 48,
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      option.title,
                                      textAlign: TextAlign.center,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }).toList(),
                        );
                      }
                    },
                  ),
                ),
              ],
            ),
            SizedBox(height: 16), // Spacer between grids and title
            // Second grid with title
  
            
          ],
        ),
      ),
    );
  }

  // Method to get dashboard options from shared preferences
  Future<List<DashboardOption>> _getDashboardOptions() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // Example: Retrieve options from shared preferences and return them
    if (prefs.getString("isStudent") == "student" && prefs.getString("token") != null)  {
      return ClassDashboardItems().presetOptions;
    }
    print("passei aqui ");
    return StaffDashboardItems().presetOptions1stRow;
  }
}