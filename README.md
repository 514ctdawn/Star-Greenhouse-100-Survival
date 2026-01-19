# Star Greenhouse: 100% Survival

A primary school math game focused on teaching percentages using mechanics inspired by "Oxygen Not Included".

## Features

- **Interactive 10x10 Grid**: Visual representation of percentages (100 cells = 100%)
- **Real-time Meters**: Oxygen, Power, and Bio-Waste meters that decay over time
- **Percentage Visualization**: Cells light up based on the percentage entered
- **Impurity Mode**: Add random waste (5-10%) to practice calculating remaining space
- **Cascading Failure Effects**: 
  - Pressure warning when total exceeds 100% (screen shake + red flash)
  - Plant wilting animation when oxygen stays below 20% for >10 seconds
- **Validation System**: Instant feedback on success/failure
- **Interactive Tutorial System (繁體中文)**: 
  - Step-by-step guided tutorial with element highlighting
  - Only shows once on first visit (uses localStorage)
  - Can be restarted anytime via "重新開始教學" button
  - Interactive step requiring user to adjust slider before proceeding
  - Real-time calculation hints during impurity mode tutorial
- **Stylized Feedback Modals (繁體中文)**:
  - Success modal with emerald/green theme and reward animation (+50 points)
  - Failure modal with rose/red theme and shake animation
  - Intelligent error detection (over 100%, under target, impurity not calculated)
  - Educational hints and guidance messages for each error type
  - Sound effect placeholders for future audio integration

## Tech Stack

- React 18 (Vite)
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## How to Play

### First Time Users
When you first open the game, an interactive tutorial (繁體中文) will guide you through all features. The tutorial:
- Highlights specific UI elements
- Explains each feature step-by-step
- Requires interaction at step 3 (adjusting the oxygen slider)
- Shows real-time calculation hints during impurity mode

### Gameplay

1. **Set Target Percentage (設定目標百分比)**: Use the slider or input field to set your target percentage
2. **Adjust Oxygen Refill (調整氧氣填充量)**: Use the slider to set how much oxygen you want to add
3. **Toggle Impurity Mode (開啟雜質模式)**: Enable to add random waste (5-10%) to the system
4. **Add Impurities (添加雜質)**: Click the button to randomly add 5-10% waste
5. **Apply (執行)**: Click "執行" to check if your calculation is correct
   - Success: The grid border glows green and oxygen is restored
   - Failure: See feedback showing how far off you were

### Restart Tutorial
Click "重新開始教學" button in the control panel to restart the tutorial anytime.

## Game Mechanics

- **Percentage Calculation**: `Current% + Input% + Impurity% = Total%`
- **Success Condition**: Total% must equal Target% (within 0.1% tolerance)
- **Pressure Warning**: Triggers when Total% > 100%
- **Plant Wilting**: Triggers when Oxygen < 20% for more than 10 seconds

### Feedback System

The game provides detailed feedback through stylized modals:

**Success Modal:**
- Emerald/green theme with smooth slide-in animation
- Shows "Mission Accomplished" message
- Displays reward (+50 points)
- Options: "進入下一關" or "繼續強化基地"

**Failure Modal:**
- Rose/red theme with shake animation
- Intelligent error detection:
  - **Over 100%**: Warns about system overload
  - **Under Target**: Shows gap percentage needed
  - **Impurity Not Calculated**: Detects when user forgot to account for waste
  - **General Mismatch**: Shows error margin
- Educational hints for each error type
- Options: "重新檢查數值" or "請求技術支援"

## Project Structure

```
src/
├── components/
│   ├── TopBar.jsx          # Meter display (氧氣, 電力, 生物廢料)
│   ├── GridSystem.jsx      # 10x10 interactive grid
│   ├── ControlPanel.jsx    # Control inputs and buttons (繁體中文)
│   ├── TutorialManager.jsx # Interactive tutorial system (繁體中文)
│   └── FeedbackModal.jsx   # Success/failure feedback modals (繁體中文)
├── hooks/
│   ├── useGameState.js     # Game state management
│   └── useLocalStorage.js  # LocalStorage hook for tutorial persistence
├── App.jsx                 # Main application component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Future Enhancements

- Multiplayer/cooperative mode
- Teacher console with attempt logging
- "Heavy Bottle" feature (12.5% increments)
- More visual feedback and animations
- Difficulty levels

