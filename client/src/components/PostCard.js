import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image, Icon, Label } from "semantic-ui-react";
import moment from "moment";

const PostCard = ({ post }) => {
  const {
    body,
    createdAt,
    id,
    username,
    likeCount,
    likes,
    commentCount,
  } = post;
  function likePost() {
    console.log("like post");
  }

  function commentOnPost() {
    console.log("comment");
  }

  return (
    <div>
      <Card.Group>
        <Card>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmileyrainbow.files.wordpress.com%2F2008%2F10%2Fcodegeassr2_004_01.jpg&f=1&nofb=1"
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
              {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button as="div" labelPosition="right" onClick={likePost}>
              <Button color="teal" basic>
                <Icon name="heart" />
              </Button>
              <Label basic color="teal" pointing="left">
                {likeCount}
              </Label>
            </Button>
            <Button as="div" labelPosition="right" onClick={commentOnPost}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default PostCard;
