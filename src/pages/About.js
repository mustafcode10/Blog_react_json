import React from 'react'
import {MDBContainer, MDBTypography} from 'mdb-react-ui-kit'

const About = () => {
  return (
    <div style={{marginTop: "100px"}}>
        <MDBContainer>
          <MDBTypography  center note noteColor="primary">
            It is blogging website where you will find blog  to different category 
            like Travel, Food, Sports, Fitness, Tech and Fashion.
          </MDBTypography>
        </MDBContainer>
    </div>
  )
}

export default About