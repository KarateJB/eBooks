# Introduction

The success of a project depends on how quickly and effectively the teams resolves the problems.

1.  Identify problems, impediments and risks
2.  Solve them at the right time
3.  Update stakeholder’s expectation
4.  Visible, monitored and prioritized list of issues and threats (Transparency)
5.  Prevention

<br><br>
# Risk/Threat Management

| <center>Type</center> |  <center>Description</center>  | <center>Note</center>  |
|:---------------------:|:-------------------------------|:-----------------------|
| Problem               | Already happened               |                        |
| Issue                 | Will occur soon or later       |                        |
| Risk                  | Might or not happen in the future | Can be **Threat** or **Opportunity** |


1. Risk identification responsibility: Stakeholder, Customer (PO), Team.

2. Risk severity(嚴重度)=Risk probability X Risk impact

3. Risk Adjusted Backlog: Prioritize backlog with Value and Risk

4. Risk-based Spike: Time-box experiment or POC to learn the UNKNOWN.




## Core risks for software development

### Productivity variation

Difference between planned and actual performance.

### Scope creep

Additional requirements.

### Specification breakdown(規格明細)

Stakeholders do not have consensus(共識) on requirement.

### Instrinsic schedule flaw

Schedule or task duration estimation sucks.

### Personnel loss

Loss of human resource.


## Tackle risks

1. Identify risks
2. Prioritize risks
3. Plan response
4. Carry out responses
5. Control and review



# Problem Detection techniques

## Spike

## Definition of Done

`DoD` is agreed by the whole project team, including of Stakeholder, Sponsor, Customer and PO, Development team.

1.  DoD for a feature
2.  DoD for a Sprint
3.  DoD for a Release

## Frequent validation and verification

By testers, automated testing tools and feedback.

## Variance and Trend analysis

Variance and Trend analysis is important for controlling/problem detection/continuous improvement to ensure quality.

## Control Chart

When
1. Data falls outside the upper or lower control limit(UCL/LCL)
2. Data falls on the same side for 7 times in a continuous records

We have to find the root cause, which includes
1. Common cause
2. Special cause: happens only on special scenario or reasons


## WIP(Work In Progress) limit

1. Preventing bottlenecks
2. When reach WIP limit, the team stops and work together(swarming) to clear the bottleneck

## CFD (Cumulative Flow Diagram)

## Daily standup/Retrospective meeting

## Lead time/Cycle time

1. Lead time:
   Feature spec (requirement confirmed) <-> Feature go-live on Production

2. Cycle time:
   Pick up the feature (requirement) <-> Complete development

3. Defect cycle time:
   Get defect <-> Solve it


> Lead time > Cycle time


## Escaped Defects and Defect Rate

1. Escaped defects are those found by customers.
2. Agile team sets alarm when velocity is low and defect rate is high to take actions.

## Defect rate




<br><br>
# Root cause techniques

## The Five whys

## Fishbone diagram analysis



<br><br>
# Cost of Change

1. Avoid design rework by only completing the design JUST IN TIME
2. XP: Pair programming, TDD, continuous delivery


<br><br>
# Technical Debt

1.  Poor design
2.  Fix bugs with a easy way
3.  Too quick decisions
4.  Quick doing with mess


<br><br>
# Problem resolution


### Steps

1.  Gather data
2.  Generate insights(data analysis)
3.  Decide what to do


### Best police

Prevent problems:

1.  XP core/best practice
2.  No scope creep
3.  Tech debt as little as possible
4.  Maintain constant pace