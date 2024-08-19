

class Pix {
  final int id;
  final int idclass;
  final String? rastud;
  String? pixKey;
  final String description;
  final String beneficiado;
  final String amount;
  final String city;
  final DateTime? dueDate;
  final String pixCode;

  Pix({
    required this.id,
    required this.idclass,
    this.rastud,
    this.pixKey,
    required this.description,
    required this.beneficiado,
    required this.amount,
    required this.city,
    this.dueDate,
    required this.pixCode,
  });

  factory Pix.fromJson(Map<String, dynamic> json) {
    return Pix(
      id: json['ID'],
      idclass: json['IDCLASS'],
      rastud: json['RASTUD'],
      pixKey: json['PIXKEY'],
      description: json['DESCRIPTION'],
      beneficiado: json['BENEFICIADO'],
      amount: json['AMOUNT'],
      city: json['CITY'],
      dueDate: json['DUE_DATE'] != null ? DateTime.parse(json['DUE_DATE']) : null,
      pixCode: json['PIX_CODE'],
    );
  }
}

