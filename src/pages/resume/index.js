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
                <li>Computer graphics, computational geometry.</li>
                <li>Cloud</li>
              </ul>
            </p>

            <h3>Software Engineer, Mylo Financial Technologies</h3>
            <em>March 2018 - June 2019 | Canada</em>
            <p>
              <ul>
                <li>Rewrote Mylo app (iOS, Android).</li>
                <li>Created admin portal to improve teams efficiency.</li>
              </ul>
            </p>

            <h3>Software Engineer, Solutec</h3>
            <em>June 2017 - January 2018 | France</em>
            <p>
              <ul>
                <li>
                  Implemented a website to create complex surveys and a cross
                  platform mobile app to answer them.
                </li>
                <li>
                  Implemented a cross platform multiplayer "serious game" mobile
                  app.
                </li>
                <li>
                  Eased the transition between REST and GraphQL APIs in PHP
                  Symfony by creating a Bundle that generates a GraphQL API from
                  your SQL entities.
                </li>
              </ul>
            </p>

            <h3>Software Engineer, IRIT</h3>
            <em>June 2016 - August 2016 | France</em>
            <p>
              <ul>
                <li>
                  Implemented a cross platform mobile app to help nurses manage
                  their patients.
                </li>
                <li>
                  Automated the process of recognizing handwritten drawings
                  using artificial intelligence.
                </li>
              </ul>
            </p>

            <h2>Education</h2>
            <h3>Computer science and applied mathematics, ENSEEIHT</h3>
            <em>2014 - 2017 | France</em>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Resume;
