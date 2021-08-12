CREATE TABLE posts (title VARCHAR(30) PRIMARY KEY NOT NULL, content VARCHAR(50),created_time TIMESTAMP DEFAULT now(),author VARCHAR(20));


CREATE TABLE author (first_name VARCHAR(30) PRIMARY KEY, last_name VARCHAR(30));


ALTER TABLE posts ADD FOREIGN KEY(author) REFERENCES author(first_name) ON DELETE CASCADE;


CREATE TABLE comments (comment_body VARCHAR(50),post_name VARCHAR(30), FOREIGN KEY(post_name) REFERENCES posts(title) ON DELETE CASCADE);


CREATE TABLE tags (tag_name VARCHAR(20) PRIMARY KEY);

CREATE TABLE post_tags (tag_name VARCHAR(20),post_name VARCHAR(30),FOREIGN KEY(tag_name) REFERENCES tags(tag_name) ON DELETE CASCADE, FOREIGN KEY(post_name) REFERENCES posts(title) ON DELETE CASCADE);


INSERT INTO author values("JK","Rowling");
INSERT INTO author values("Christopher","Paolini");
SELECT * FROM author;
DELETE FROM author WHERE first_name = "JK";
DELETE FROM author WHERE first_name = "Christopher";
INSERT INTO author VALUES("Christopher","Paolini"),("JK","Rowling"),("Leo","Tolstoy"),("Mark","Twain"),("William","Shakespear");

INSERT INTO posts (title,content,author) VALUES("abc","this is test post 1","JK");
DELETE FROM posts WHERE title = "abc";
INSERT INTO posts (title,content,author) VALUES("abc","this is test post 1","JK"),("def","this is test post 2","Leo"),("ghi","this is test post 3","William"),("xyz","this is test post 4","Christopher");
INSERT INTO posts (title,content,author) VALUES("lol","this is test post 1.1","JK");


INSERT INTO comments VALUES ("comment1","abc"),("comment2","abc"),("comment3","abc");
INSERT INTO comments VALUES("comment1","xyz"),("comment2","xyz");
INSERT INTO comments VALUES ("comment1","def"),("comment2","def"),("comment3","def");
INSERT INTO comments VALUES ("comment1","ghi"),("comment2","ghi"),("comment3","ghi"),("comment4","ghi");

INSERT INTO tags VALUES("Happy"),("Sad"),("Angry"),("Surprise"),("Fear"),("Scared");

INSERT INTO post_tags VALUES("Happy","abc"),("Sad","def"),("Sad","xyz"),("Angry","ghi"),("Surprise","abc"),("Fear","def");





-- if a tag is deleted, it removes link between the post and tag
SELECT * FROM tags;
DELETE FROM post_tags WHERE tag_name = "Surprise";

-- a post should consists of 1 or more tags
SELECT * FROM post_tags;

--a post can have multiple comments
SELECT * FROM comments;


-- we can find all posts and comments of an author
SELECT author.first_name,author.last_name,posts.title,comments.comment_body FROM author JOIN posts ON author.first_name = posts.author JOIN comments ON posts.title=comments.post_name;


--If an author is deleted all its posts and comments should be deleted; 

SELECT * FROM author;
SELECT * FROM posts;
SELECT * FROM comments;
DELETE FROM author WHERE first_name = "JK";




