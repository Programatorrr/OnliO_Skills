# Pavel Dikan — IT Operations Portfolio

Personal technical portfolio prepared for the recruitment process
for the position **IT Operations Engineer (Linux / DevOps)** at
Onlio, a.s.

## Live website

https://programatorrr.github.io/OnliO_Skills/

## Purpose

The website contains detailed answers to eight technical and
experience-related questions received during the recruitment process.

It presents examples of my experience with:

- Linux server administration;
- infrastructure monitoring and troubleshooting;
- system and application logs;
- OpenStack, Ceph, Puppet and Foreman;
- physical servers and network infrastructure;
- Kubernetes, MicroK8s, Argo CD, Helm and K9s;
- Bash, automation and scripting;
- customer communication and incident escalation.

Questions concerning office attendance, preferred form of cooperation,
salary expectations and availability are answered separately by e-mail.

## Experience levels

The website distinguishes between different types of experience:

### Professional experience

- Linux and Ubuntu server operations;
- OpenStack virtual infrastructure;
- Ceph distributed storage;
- Puppet and Foreman;
- Sensu and Uchiwa monitoring;
- incident diagnostics;
- physical server hardware;
- customer infrastructure and communication.

### Laboratory and academic experience

- MicroK8s and Kubernetes;
- Argo CD and GitOps;
- Helm;
- K9s;
- Kotlin and Spring Boot applications communicating with Kubernetes;
- Python automation and cloud-metrics processing.

This distinction is used to avoid presenting laboratory projects
as production experience.

## Featured projects

### TeamCity Cloud Remote Shell Executor

A demonstration application written in Kotlin and Spring Boot.
It creates temporary Kubernetes executor Pods, runs shell tasks,
retrieves logs and manages the workload lifecycle.

Repository:

https://github.com/Programatorrr/TeamCity-Cloud-Remote-Shell-Executor

### Predictive Alerting for Cloud Metrics

A laboratory Python pipeline that generates synthetic infrastructure
metrics, creates time-window features, trains a classification model
and evaluates the risk of a future incident.

Repository:

https://github.com/Programatorrr/cloud-metrics-incident-prediction

## Documents

The website provides access to:

- my current CV;
- supporting documentation describing my previous PLC and SCADA
  experience with Allen-Bradley systems.

## Visual concept

The visual style was inspired by the publicly accessible website
of Onlio, a.s., including its dark-blue and green colour direction.

This is an independent candidate portfolio. It is not an official
website of Onlio, a.s. and does not represent the company.

The HTML, CSS and JavaScript implementation was created specifically
for this project. No internal or proprietary source code belonging
to Onlio was used.

## Privacy

The website does not use:

- analytics;
- advertising trackers;
- cookies;
- registration forms;
- external databases;
- automated collection of visitor data.

The published materials are intended only to demonstrate the
applicant's own experience and projects.

Credentials, access tokens and confidential customer information
are not intentionally included.

This description concerns the technical design of the website and
is not a formal legal GDPR assessment.

## Main features

- responsive desktop and mobile layout;
- expandable answers;
- light and dark themes;
- active section navigation;
- image lightbox;
- downloadable CV;
- downloadable supporting technical documentation;
- keyboard-accessible controls;
- reduced-motion support.

## Technologies

The website is implemented using:

- semantic HTML;
- modern CSS;
- vanilla JavaScript;
- GitHub Pages.

No frontend framework or build process is required.

## Running locally

Clone the repository:

```bash
git clone https://github.com/Programatorrr/Onlio_Skills.git
cd Onlio_Skills

Onlio_Skills/
├── index.html
├── styles.css
├── app.js
├── README.md
├── documents/
│   ├── Pavel_Dikan_FlowCV_Resume.pdf
│   └── allen-bradley-plc-scada-experience.pdf
└── images/
    └── website screenshots and technical photographs
