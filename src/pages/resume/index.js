import React from 'react';
import Layout from '@theme/Layout';

function Resume() {
  return (
    <Layout>
      <div className="container padding-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2 markdown">
            <h1 className="center page-title">Resume</h1>
            <h2>Professional Experience</h2>
            <h3>Software Engineer, Autodesk</h3>
            <em>June 2019 - present | Canada</em>
            <p>
              <ul>
                <li>
                  Building a website to create and manipulate 3D objects using a
                  declarative data format.
                </li>
                <li>Analyzing 3D objects to infer structural information</li>
              </ul>
            </p>

            <h3>Software Engineer, Mylo Financial Technologies</h3>
            <em>March 2018 - June 2019 | Canada</em>
            <p>
              <ul>
                <li>Rewrote Mylo app as a cross-platform app.</li>
                <li>
                  Built an internal admin portal and an API to increase teams
                  efficiency by easing and automating tasks.
                </li>
                <li>
                  Maintained legacy Android Mylo app (rating from 3.0 to 4.4 on
                  PlayStore).
                </li>
              </ul>
            </p>

            <h3>Software Engineer, Solutec</h3>
            <em>June 2017 - January 2018 | France</em>
            <p>
              <ul>
                <li>
                  Built a website, a cross-platform mobile app and an API to
                  create and answer complex surveys.
                </li>
                <li>
                  Built a cross-platform mobile app and an API multiplayer quiz
                  game.
                </li>
                <li>
                  Eased the transition from REST to GraphQL in PHP by creating a
                  tool that generates a GraphQL API from your SQL entities.
                </li>
              </ul>
            </p>

            <h3>Software Engineer, IRIT</h3>
            <em>June 2016 - August 2016 | France</em>
            <p>
              <ul>
                <li>
                  Built a cross-platform mobile app and an API to manage
                  patients.
                </li>
              </ul>
            </p>

            <h2>Education</h2>
            <h3>Computer science and applied mathematics, ENSEEIHT</h3>
            <em>2014 - 2017 | France</em>
            <p>
              <ul>
                <li>
                  FP, OOP, OS, Data Structures & Algorithms, Compilers,
                  Numerical Optimization, Linear Algebra, Analysis and more.
                </li>
              </ul>
            </p>

            <h2>Languages & technologies</h2>
            <p>
              <ul>
                <li>Typescript / Javascript, Reason / OCaml and more.</li>
                <li>
                  React, React Native, Mobx, Redux, GraphQL, Node.js, Three.js,
                  AWS and more.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Resume;
