# Contacts Project

This repo is a code-along with the first project in the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

Most of the commits in this repository correspond to videos in the program.

## Project Setup

- clone the Project - `git clone https://github.com/udacity/reactnd-contacts-complete.git`
- install the dependencies - `npm install`

## Contributing

Because this is a code-along project and the commits correspond to specific videos in the program, we will not be accepting pull requests.

If you feel like there's a major problem, please open an issue to discuss the problem and potential resolution.

## Contributing

MIT

## My Notes

React Router: https://github.com/remix-run/react-router

Can pass an object to the Link component.
https://v5.reactrouter.com/web/api/Link

<Link to={{
 pathname: '/courses',
 search: '?sort=name',
 hash: '#the-hash',
 state: { fromDashboard: true }
}}>
 Courses
</Link>

<Route> component renders UI when path matches url.

Serialize form data
https://www.npmjs.com/package/form-serialize
npm install --save form-serialize
