CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    userImg VARCHAR(255) NULL,
    PRIMARY KEY (id),
)
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL, 
    img VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    uid INT NOT NULL,
    cat VARCHAR(45) NOT NULL,
    PRIMARY KEY(id),
    INDEX uid_idx {uid : ASC } VISIBLE
    CONSTRAINT uid 
        POREIGN KEY uid ,
        REFERENCES users(id),
        ON DELETE CASCADE,
        ON UPDATE CASCADE,
)