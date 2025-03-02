# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Globetrotter Challenge

Globetrotter Challenge is a fun and interactive quiz application where users can test their knowledge of world destinations. The app presents a series of questions where users must guess the correct city based on a given clue. Users can track their score and challenge friends to beat their score.

## Features

- **Interactive Quiz**: Guess the correct destination based on clues.
- **Score Tracking**: Keep track of correct and incorrect answers.
- **Fun Facts**: Learn interesting facts about each destination.
- **Challenge Friends**: Share your score and challenge friends to beat it.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Axios**: For making HTTP requests to fetch destination data.
- **React-Confetti**: Adds a confetti effect for correct answers.
- **React-Toastify**: Provides toast notifications for user feedback.
- **HTML2Canvas**: Used for generating shareable images.
- **React-Modal**: For displaying modals to challenge friends.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/globetrotter-challenge.git
   ```

2. Navigate to the project directory:

   ```bash
   cd globetrotter-challenge
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

Start the development server:

bash
npm run dev


Open your browser and go to `http://localhost:5173` to see the app in action.

## Usage

- Select the correct city based on the clue provided.
- After selecting an answer, incorrect options will have reduced opacity.
- Click "Next Destination" to proceed to the next question.
- After completing all questions, you can submit your score and challenge a friend.

## Code Structure

- **src/App.jsx**: Main component containing the game logic and UI.
- **src/components/ChallengeFriend.jsx**: Component for the challenge friend modal.
- **src/App.css**: Styles for the application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [dr.vijaianand07@gmail.com].
