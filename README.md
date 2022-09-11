# Aero-psycho dashboard

An isomorphic React app with serverless architecture, alongside a serverless API, to showcase these technologies for an IoT use case.

You can try the application here, or watch a video of it here.

## Hypothetical value proposition

Imagine a future where airlines' optimization of customer experience has reached the point that they have begun measuring various metrics inside flights using sensors. After weeks of hard work, a team of world-class service designers has narrowed the most critical metrics for the air travel experience to _mood_, _tiredness_ and _love_. Now we need a way to display these in an intuitive manner to our main user groups:

1. Airlines want to optimize their CX across their fleets.
2. Airports want to find out whether to take any mitigating measures after landing, depending on the CX on board.

This project is an MVP for the second user group. We aim to give airports the ability to monitor incoming flights, both on an aggregate and a granular level.

**Note**: This vision of biometric customer monitoring obviously has a disturbing taste; such a policy would constitute an egregious violation of privacy. Our aim here is not to suggest how air travel should develop, but rather to inspire you with the possibilities of cutting-edge technologies. And like all good pieces of dystopian fiction, hopefully this will strengthen your resolve to build up a future in which we would not have to experience such things.

## Architecture

<img src="architecture.png" width="600"/>

### App

We use a universal aka. isomorphic React app, in which rendering is done server-side and a configuration context is passed into the browser. The server-side code is bundled and deployed as a lambda, which performs the rendering. The browser-side code is bundled for browsers, and then stored in S3 alongside static files. These files are then served to the client's browser, leveraging S3's and lambda's blazing-fast response times for a smooth, sweet UX.

We used [this](https://github.com/arabold/serverless-react-boilerplate) boilerplate for the isomorphic app. It is explained in depth [here](https://www.serverless.com/blog/react-js-on-aws-lambda).

### API

**Deployment**: The great variability of the intensity of air travel over a 24-cycle as well as over a year suggests that we should go for a lambda-based solution for the API too.

**Message handling**: We also have to be able to deal with a massive volume of flight updates, ensuring that their order is not messed up, and that nothing is lost. As such, we have gone for AWS Simple Queue Service to manage our queue of flight updates. In other words, our API constitutes a webhook.

**Storage**: For the same reason, since we need a database solution of massive scalability and robustness, we have used dynamoDB.

## Disclaimer

This project exhibits just one possible, relatively simple architecture for IoT applications, and is not necessarily the best in all respects. AWS provides a rich array of services to choose from depending on your use case, including their dedicated solution, IoT Core.
