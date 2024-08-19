import 'package:eduvision_client/model/classes_structure.dart';
import 'package:eduvision_client/services/classes_api_service.dart';
import 'package:eduvision_client/services/user_API_service.dart';
import 'package:flutter/material.dart';
import 'package:eduvision_client/model/pix.dart';
import 'package:eduvision_client/services/pix_api_service.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

void _copyToClipboard(String text) {
  Clipboard.setData(ClipboardData(text: text));
}



Widget _buildInfoRow(String label, Object value) {
  String formattedValue = '';

  if (value is DateTime) {
    formattedValue = DateFormat('dd/MM/yyyy').format(value);
  } else {
    formattedValue = value.toString();
  }

  

  return Row(
    children: [
      Text(
        label.toString(),
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
      ),
      SizedBox(width: 8),
      Expanded(
        child: Text(
          formattedValue,
          style: TextStyle(
            fontSize: 16,
          ),
        ),
      ),
    ],
  );
}

class PixListScreen extends StatefulWidget {
  final bool isAdmin; // Add a property to determine if the user is an admin

  PixListScreen({required this.isAdmin});



  @override
  _PixListScreenState createState() => _PixListScreenState();
}

class _PixListScreenState extends State<PixListScreen> {
  late List<Pix>? _pixList = [];
  late List<Pix>? pixList = [];
  late bool _isLoading;
  List<String> _classList = [];
  String? _selectedClassId; // Selected class ID


// Function to fetch class list
  Future<void> fetchClassList() async {
    try {
      List<ClassesStructure> classes = await ClassesAPIService().getAllClasses();

      setState(() {
        _classList = classes.map((classObj) => '${classObj.idClass} - ${classObj.className} - ${classObj.letter}').toList();
      });
      
    } catch (e) {
      print(e);
      // Handle error appropriately
    }
  }

void _deletePix(Pix pix) async {
  // Implement the logic to delete the PIX entry at the given index
      await PixAPIService().deletePix(pix.id);

  setState(() {
    _fetchPixData(selectedClassId: _selectedClassId);

    // _pixList!.removeAt(index);
  });
}

  @override
  void initState() {
    super.initState();
    _isLoading = true;
    widget.isAdmin ? 
    fetchClassList() : _fetchPixData();// Fetch class list when the screen initializes

  }

  Future<void> _fetchPixData({String? selectedClassId}) async {

    try {

      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? rastud = prefs.getString("rastud");

      if (widget.isAdmin == false && rastud == null) {
        return;

       };


      

      if (widget.isAdmin == false ) {
        dynamic data = await UserAPIService().fetchStudentClassBy(rastud);
      int idClass = data['ID_CLASS'];
        print("admin is false");
        pixList = await PixAPIService().getPixByIdclass(idClass);

      } else {
      print("admin is true");
pixList = await PixAPIService().getPixByIdclass(int.parse(selectedClassId!));

        // pixList = await PixAPIService().getAllPix();

      }


      setState(() {
        _pixList = pixList;
        _isLoading = false;
      });
    } catch (error) {
      print('Error fetching PIX data: $error');
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text(widget.isAdmin ? 'Pagamentos' : 'Meus pagamentos'),
    ),
    body: 
    Column(
      children: [
        // Dropdown for selecting class
    if (widget.isAdmin && _classList.isNotEmpty)  // Ensure _classList has at least three elements
    Padding(
      padding: EdgeInsets.all(8.0),
      child:  DropdownButtonFormField<String>(
          value: _selectedClassId,
          hint: Text('Selecione a turma...'),
          items: _classList.map((String value) {
            List<String> classInfo = value.split(' - ');
            String idClass = classInfo[0];
            String className = classInfo[1];
            String letter = classInfo[2];
            return DropdownMenuItem<String>(
              value: idClass,
              child: Text("${className} - ${letter}"),
            );
          }).toList(),
          onChanged: (newValue) {
            setState(() {
              _selectedClassId = newValue;
              _fetchPixData(selectedClassId: _selectedClassId);
            });
          },
        ),

    ),

       
        Expanded(
          child: _isLoading
              ? Center(child: CircularProgressIndicator())
              : _pixList!.isEmpty
                  ? Center(child: Text('Ainda não há nenhum pagamento cadastrado para a turma.'))
                  : ListView.builder(
                      itemCount: _pixList?.length,
                      itemBuilder: (context, index) {
                        Pix? pix = _pixList?[index];
                        return Card(
                          color: Colors.grey[200],
                          elevation: 4,
                          margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: ListTile(
                            contentPadding: EdgeInsets.all(16),
                            title: Text(
                              pix?.description ?? '',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                SizedBox(height: 8),
                                _buildInfoRow('Beneficiário:', pix?.beneficiado ?? ''),
                                _buildInfoRow('Valor:', pix?.amount.toString() ?? ''),
                                _buildInfoRow('Cidade:', pix?.city ?? ''),
                                _buildInfoRow('Chave Pix:', pix?.pixKey ?? ''),

                                _buildInfoRow('Data de vencimento:', pix?.dueDate ?? ""),
                                SizedBox(height: 8),
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        'Pix Copia e Cola: ${pix?.pixCode ?? ''}',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                    IconButton(
                                      icon: Icon(Icons.content_paste),
                                      onPressed: () {
                                        _copyToClipboard(pix?.pixCode ?? '');
                                      },
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            trailing: widget.isAdmin
                                ? Container(
                                    width: 40,
                                    height: 40,
                                    decoration: BoxDecoration(
                                      color: Colors.red,
                                      borderRadius: BorderRadius.circular(20), // Make it rounded
                                    ),
                                    child: IconButton(
                                      icon: Icon(
                                        Icons.delete_rounded,
                                        color: Colors.white, // White foreground color
                                        size: 24, // I
                                      ),
                                      onPressed: () {
                                        _deletePix(pix!);
                                      },
                                    ),
                                  )
                                : null,
                          ),
                        );
                      },
                    ),
        ),
      ],
    ),
  );
}

  
}
