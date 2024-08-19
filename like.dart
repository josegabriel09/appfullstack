class Like {
  final int postId;
  final String userId;
  final String userType;

  Like({
    required this.postId,
    required this.userId,
    required this.userType,
  });

  Map<String, dynamic> toJson() => {
        'postId': postId,
        'userId': userId,
        'userType': userType,
      };
}