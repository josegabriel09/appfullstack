import 'dart:convert';

class Feed {
  String postId;
  String userID;
  String userType;
  String contentText;
  String contentMedia;
  String timestamp;

  Feed({
    required this.postId,
    required this.userID,
    required this.userType,
    required this.contentText,
    required this.contentMedia,
    required this.timestamp,
  });

  factory Feed.fromJson(Map<String, dynamic> json) {
    return Feed(
      postId: json['postID']?.toString() ?? '',
      userID: json['userID']?.toString() ?? '',
      userType: json['userType']?.toString() ?? '',
      contentText: json['contentText']?.toString() ?? '',
      contentMedia: json['contentMedia']?.toString() ?? '',
      timestamp: json['timestamp']?.toString() ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'postID': postId,
      'userID': userID,
      'userType': userType,
      'contentText': contentText,
      'contentMedia': contentMedia,
      'timestamp': timestamp,
    };
  }

  Feed copyWith({
    String? postId,
    String? userID,
    String? userType,
    String? contentText,
    String? contentMedia,
    String? timestamp,
  }) {
    return Feed(
      postId: postId ?? this.postId,
      userID: userID ?? this.userID,
      userType: userType ?? this.userType,
      contentText: contentText ?? this.contentText,
      contentMedia: contentMedia ?? this.contentMedia,
      timestamp: timestamp ?? this.timestamp,
    );
  }
}
