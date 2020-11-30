# Prognosticator
Professional American Football Live Play Calling Prediction Game

# SCORING
- Run (3)
  - Left (2)
    - Touchdown (5)
    - Turnover (6)
      - Touchdown (4)    
  - Middle (2)
    - Touchdown (5)
    - Turnover (6)
      - Touchdown (4)
  - Right (2)
    - Touchdown (5)
    - Turnover (6)
      - Touchdown (4)
  - Touchdown (4)
  - Turnover (5)
    - Touchdown (4)
- Pass (3)
  - Short [ < 5 Yards ] (2)
    - Touchdown (5)
    - Turnover (6)
      - Touchdown (4)    
  - Medium [ 5 - 10 Yards ] (2)
    - Touchdown (5)
    - Turnover (6)
      - Touchdown (4)    
  - Long [ > 10 Yards ] (2)
    - Touchdown (5)
    - Turnover (6)
        - Touchdown (4)
  - Touchdown (4)
  - Turnover (5)
    - Touchdown (4)

# RULES
- Penalty voids play, whether accepted or declined.
- Play call must be in 5 seconds before snap.
- Quick snaps may cause void of play.
- Turnover on downs will score as a turnover.
- Points are cumulative, single wrong selection scores 0 for the play.
- Can select as many options in tree as desired at own peril.

## RUNNING SERVER NODE
- Development
  - npm run dev
- Test
  - npm test
- Production
  - npm start