class Post {
  final int id;
  final String title;
  final String content;
  final String authorName;
  final DateTime createdAt;
  final DateTime updatedAt;
  final int likeCount; 
  bool isLiked;

  Post({
    required this.id,
    required this.title,
    required this.content,
    required this.authorName,
    required this.createdAt,
    required this.updatedAt,
    this.likeCount = 0,
    this.isLiked = false,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['ID'],
      title: json['TITLE'],
      content: json['CONTENT'],
      authorName: json['AUTHOR_NAME'],
      createdAt: DateTime.parse(json['CREATED_AT']),
      updatedAt: DateTime.parse(json['UPDATED_AT']),
      likeCount: json['LIKE_COUNT'] ?? 0, // Supondo que o backend retorna LIKE_COUNT
    );
  }

  copyWith({required int likeCount, required bool isLiked}) {}
}