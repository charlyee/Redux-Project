import * as React from "react";
import "./main.css";
import { RootState } from "../store";
import { connect } from "react-redux";
import { Profile } from "../store/types/types";
import { logOut } from "../store/actions/actions";
import EditProfilePage from "./EditProfilePage";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

import {
  Image,
  Card,
  Segment,
  Grid,
  Dropdown,
  Container,
  Header,
  Radio,
  Form,
  TextArea,
  Icon,
  Button,
  Responsive,
} from "semantic-ui-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IUser } from "../models/IUser";
import About from "./EditProfilePage";
import LOGO from "./Logo.png";

export interface IProfilePageProps {
  // Variables passed in from the store state
  match: any;
  profiles: Profile[];
  logOut: typeof logOut;
}

export interface IProfilePageState {
  // our local state variables
  redirect: boolean;
}

export class ProfilePage extends React.Component<
  IProfilePageProps,
  IProfilePageState
> {
  constructor(props: IProfilePageProps) {
    super(props);
    this.state = { redirect: false };
  }

  loggedOut = () => {
    // The function that calls our logOut REDUCER!
    let { logOut, profiles } = this.props; // The store states logOut REDUCER and profiles array

    let uName = profiles.filter((profile) => profile.loggedIn === true); // filter through the profiles array and return any profile that has it's loggedIn field set to true.

    logOut(uName[0]); // Pass the profile to the logOut REDUCER! It takes in a Profile[] as it's payload.

    // When we log out we want to save our global state (This might not be necessary anymore)
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.setItem("userName", ""); // username of the person who is logged in
    window.location.href = "/";
  };

  handleRedirect = () => {
    // This sets our local state variable that determines if we go to the Edit Profile Page
    this.setState({ redirect: true });
  };

  public render() {
    let { profiles } = this.props; // load in the profiles from the store state

    let uName = profiles.filter((profile) => profile.loggedIn == true); // find out who user is logged in
    let {
      aboutMe,
      name,
      password,
      id,
      loggedIn,
      cohort,
      programming,
      city,
      spoken,
    } = uName[0]; // Deconstructing the current user's store profile fields

    if (this.state.redirect === true) {
      // If we are wanting to redirect to the Edit Profile Page
      return (
        <Router>
          {/* Render the EditProfilePage */}
          <Link to="" component={EditProfilePage} />

          {/* Redirect the URL to /edit-profile/**name of the Logged in User** */}
          <Redirect to={`/edit-profile/${name}`} />
        </Router>
      );
    }

    return (
      // If there is no redirect request. Render the Profile Page

        <Grid divided="vertically">
          <Grid.Row columns={8}>
            <Grid.Column>
            <Container>
            <Image src={LOGO} size="large" circular centered/>
            </Container>
            </Grid.Column>
            <Grid.Column floated="right">
              <Dropdown text="Groups">
                <Dropdown.Menu>
                  <Dropdown.Item text="Group 1" />
                  <Dropdown.Item text="Group 2" />
                  <Dropdown.Item text="Group 3" />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column>
              <Dropdown text="Class Mates">
                <Dropdown.Menu>
                  <Dropdown.Item text="Andrew" />
                  <Dropdown.Item text="Charles" />
                  <Dropdown.Item text="Cai" />
                  <Dropdown.Item text="Trina" />
                  <Dropdown.Item text="Mohammad" />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column>
              <Container align="center">
                <Button circular color="green" onClick={this.handleRedirect}>
                  Edit Profile
                </Button>
                <Icon name="forumbee" loading inverted color="black" />
                <Button circular color="yellow" onClick={this.loggedOut}>
                  Log Out
                </Button>
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Card>
              <Responsive as={Card} minWidth={768}>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Andrew Scott</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2020</span>
                  </Card.Meta>
                  <Card.Description>
                    Andrew is a great guy :-).
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {/* <a>
              <Icon name='user' />
              22 Friends
            </a> */}
                </Card.Content>
                </Responsive>
              </Card>
              <Container>
                  <Responsive as={Container} minWidth={768}>
                    <Header as="h3"> Explore </Header>

                    <Radio as="h4" label="Networking Events" defaultChecked />
                    <br></br>
                    <Radio as="h2" label="Previous Cohorts" defaultChecked />
                    <br></br>
                    <Radio as="h2" label="Groups" defaultChecked />
                    <br></br>
                    <Radio
                      as="h2"
                      label="Additional Resources"
                      defaultChecked
                    />
                    <br></br>
                    <Radio as="h2" label="Linkedin" defaultChecked />
                  </Responsive>
                </Container>
            </Grid.Column>
            <Grid.Column>
              <h2>Welcome {name}!</h2>
              <Form>
                <Segment>
                  <TextArea
                    placeholder="Create a Post"
                    style={{ minHeight: 150 }}
                  />
                  <Segment>
                    {" "}
                    <Button icon>
                      <Icon name="photo" color="green" />
                      Photo
                    </Button>
                    <Button icon>
                      <Icon name="user outline" color="green" />
                      Tag a Class Mate
                    </Button>
                  </Segment>
                </Segment>
              </Form>{" "}
              <br></br>
              <Form>
                <Segment>
                  <TextArea
                    placeholder="Ask a question"
                    style={{ minHeight: 150 }}
                  />
                  <Segment>
                    {" "}
                    <Button icon>
                      <Icon name="image outline" color="green" />
                      Screen Shot
                    </Button>
                    <Button icon>
                      <Icon name="file code outline" color="green" />
                      Group
                    </Button>
                  </Segment>
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Container>
            <Responsive as={Container} minWidth={768}>
              <Calendar />
              </Responsive>
              </Container>
              <br></br>
              <br></br>
              
            </Grid.Column>
          </Grid.Row>
        </Grid>

    );
  }
}

const mapStateToProps = (state: RootState, ownProps: IProfilePageProps) => {
  // mapStateToProps connects the store's initial state variables with ProfilePage component
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn,
  };
};

export default connect(mapStateToProps, { logOut })(ProfilePage); // connect imports the logOut REDUCER from our store and returns our connected our ProfilePage component
