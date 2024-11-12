# [24.11.12] 단어 맞추기 게임

![프론트 사이드 플젝 디자인](https://github.com/user-attachments/assets/e474b114-7a1a-43b3-8975-79a9d5f0deb4)

<br/>

# 개발 일정

| 날짜                    | 개발 기능                  |
| ----------------------- | -------------------------- |
| 2024.11.12(화) ~ 13(수) | 개발 계획서 작성           |
| 2024.11.14(목)          | 레이아웃 및 스타일 작성    |
| 2024.11.15(금) ~ 16(토) | 제시어 호출 및 타이머 기능 |
| 2024.11.18(월) ~ 19(화) | 정답 / 오답 기능           |
| 2024.11.20(수)          | 세부 기능                  |
| 2024.11.21(목)          | 코드 정리 및 제출          |
| 2024.11.22(금)          | 코드 리뷰                  |

<br/>

# 주요 기능

### 게임 시작

1. ‘Start’ 버튼 클릭
   1. 제한 시간 30초 카운트
   2. 제시어 api 호출하여 랜덤으로 단어 보여주기
      1. 같은 단어가 또 나오지 않게 (게임 오버 전까지)

### 정답 / 오답

1. 입력한 단어와 제시어 비교
2. 일치하면 정답 → 정답칸으로 이동 ( +1), 제시어 변경, 제시어 갯수(-1)
3. 일치하지 않으면 오답 → 오답칸으로 이동 (+1)
4. 제한시간
   1. 5초 미만부터 테두리에 표시

### 게임 종료

1. 제한시간 끝나면 제시어 자리에 ‘Game Over’ 표시
2. 입력란 disabled
3. ‘Reset’ 버튼 누르면 다시 게임 시작
4. 게임이 시작버튼을 누르면 제한 시간 20초 카운트 시작

<br/>

# 개발 순서 및 상세 구현 계획

### 화면 구현

1. ‘Start’ , ‘Reset’ button hover 구현
2. 입력 할 때 input창 focus
3. 남은 시간 input창 focus
4. 정답 / 오답 칸 크기 초과하면 scroll
5. 게임 오버되면 input창 disabled

### 게임 시작 ( 타이머 기능 / 제시어 업데이트 )

### 사용자 입력 검증 및 처리

### 게임 종료 및 재시작

<br/>

# 디렉토리 (예상)

📂 utils

    🗒️ api.js (api 호출)

    🗒️ timer.js (타이머 기능 및 UI 업데이트)

    🗒️ wordHandler.js (제시어 업데이트 및 표시)

    🗒️ inputHandler.js (사용자 입력 검증 및 처리)

    🗒️ gameManage.js (**게임 시작, 종료, 리셋 관리)

📂 style

    🗒️ style.css

🗒️ index.html
