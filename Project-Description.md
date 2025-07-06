# Network Systems and Administration CA 2025

**Module Code:** B9IS121  
**Module Instructor:** Kingsley Ibomo  
**Assessment Title:** Automated Container Deployment and Administration in the Cloud  
**Assessment Type:** Practical (lab-based)  
**Individual/Group:** Individual  
**Assessment Weighting:** 60%  
**Planned Feedback/Results Release Date:** Within three weeks of submission  
**Mode of Submission:** Online ONLY via Moodle

---

## PART A

The goal of this assessment is to test students' understanding and practical skills in using automation tools such as AWS CloudFormation, Ansible, Azure DevOps, and Terraform. The task involves automating the deployment of a server with a Docker container running a sample application. Students will need to explore and integrate different automation tools while working with cloud infrastructure.

### Instructions

You are tasked with deploying a server that runs a Docker container on a cloud infrastructure (AWS, GCP, or Azure) using automation tools such as AWS CloudFormation, Ansible, Azure DevOps, GitHub, and Terraform. This assignment requires you to integrate at least two of these tools in the deployment process.

---

## Part 1: Infrastructure Setup

**Objectives:** Automate the setup of cloud infrastructure to host a server instance.

**Tasks:**

- Use Git Actions, Terraform, or AWS CloudFormation to provision the cloud infrastructure (e.g., AWS EC2 instance or Azure VM).
- Ensure that security groups, networking, and other essential components are appropriately configured.
- **Deliverable:** Terraform scripts or CloudFormation templates that automate infrastructure setup, along with a diagram of the deployed resources.

---

## Part 2: Configuration Management

**Objectives:** Automate the configuration of the server.

**Tasks:**

- Use Ansible or an equivalent tool for automating server configuration (e.g., installing Docker, configuring the system environment).
- Ensure that Docker is installed and configured to automatically start on boot.
- **Deliverable:** Ansible playbooks (or other configuration scripts) and a README file explaining the automation flow.

---

## Part 3: Docker Container Deployment

**Objectives:** Automate the deployment of a Docker container running a sample web application.

**Tasks:**

- Write a Dockerfile to containerize a sample application (you can use an existing web application or create a basic one).
- Automate the deployment of the Docker container on the provisioned server using the infrastructure automation tool of your choice.
- **Deliverable:** Dockerfile, automation scripts, and a sample application repository.

---

## Part 4: CI/CD Pipeline Integration

**Objectives:** Implement a CI/CD pipeline using Azure DevOps or another CI/CD tool.

**Tasks:**

- Set up a basic CI/CD pipeline to automatically build and deploy your Docker container to the cloud infrastructure whenever code is pushed to a version control repository (e.g., GitHub).
- **Deliverable:** Azure DevOps pipeline YAML configuration (or configuration for another CI/CD tool), and a demo of the pipeline in action.

---

## Part 6: Documentation

**Objectives:** Reflect on the project and provide comprehensive documentation.

**Tasks:**

- Each student is required to write an independent report that documents each phase of the automation process, the challenges faced, and how they were overcome.
- Discuss alternative approaches that could have been taken and suggest improvements.
- Each report must include a detailed architecture diagram.

---

## Requirements

1. Create a free Azure, AWS, or any cloud account.
2. A final report and documentation file in PDF format that contains a GitHub repository link with all Terraform scripts, CloudFormation templates, Ansible playbooks, Dockerfiles, and the CI/CD pipeline configuration.
3. The report must include an architecture diagram.

---

## Technical Report Structure

| Section          | Details                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Title Page**   | Must include the title of the report. Include summary and main text word count if specified.                  |
| **Summary**      | A summary of the whole report including important features, results, and conclusions.                         |
| **Introduction** | States the objectives of the report and comments on the approach. Must not copy lab handout text.             |
| **Content**      | Provide rationale for the tools used with detailed information on alternatives, benefits, and limitations.    |
| **Conclusions**  | A short, logical summing up of the themes developed in the main text.                                         |
| **References**   | Details of all sources used, including lecture notes and URLs.                                                |
| **Appendices**   | Include screenshots and additional details if required (main report should be limited to 7 pages, 12pt font). |

---

## Guidelines for the Report

- **Word Count:** 2,000 – 2,500 words
- **Formatting:**
  - Times New Roman, 12-point font, 1.5 line spacing
  - Include a table of contents, proper citations (Harvard style), and a reference list
  - Use clear section headings and include diagrams or flowcharts where applicable
- **Sources:**
  - Use academic journals, whitepapers, DevOps documentation, and industry reports
  - Cite all sources using the Harvard referencing style

---

## MARKING SCHEME

| Component          | Weight | Notes                                                                                             |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------- |
| **Demo**           | 40%    | Justify actions and show working deployment. Marks based on understanding, planning, and clarity. |
| **Report Quality** | 50%    | Well-structured, excellent language, consistent referencing (Harvard or IEEE).                    |
| **Artifacts**      | 10%    | Reusable deployment artifacts with proper comments and naming conventions.                        |

---

## SUBMISSION

- Submit the final report in PDF format via Moodle before the deadline.
- **Deliverables:**
  1. A comprehensive PDF report (10–12 pages)
  2. A detailed README file for all scripts and configurations

> ⚠️ All documents uploaded in ZIP or ODT format will receive a zero grade.  
> ⚠️ Reports with a plagiarism score above 35% will be reported to the AI committee.

---
