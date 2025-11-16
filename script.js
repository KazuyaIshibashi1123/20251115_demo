// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// メッセージ表示関数
function showMessage() {
    alert('ボタンがクリックされました！\nJavaScriptが正常に動作しています。');
}

// フォーム送信処理
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // ここで実際の送信処理を行うことができます
    console.log('フォーム送信:', { name, email, message });
    
    alert(`ありがとうございます、${name}さん！\nメッセージを受け付けました。`);
    
    // フォームをリセット
    event.target.reset();
}

// スクロール時のアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .service-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 順位表を初期化
    initializeStandings();
});

// 順位表データ
const jleagueData = [
    { team: '横浜F・マリノス', played: 34, win: 22, draw: 6, loss: 6, goalsFor: 68, goalsAgainst: 35, points: 72 },
    { team: '川崎フロンターレ', played: 34, win: 20, draw: 8, loss: 6, goalsFor: 65, goalsAgainst: 38, points: 68 },
    { team: 'サンフレッチェ広島', played: 34, win: 19, draw: 9, loss: 6, goalsFor: 58, goalsAgainst: 32, points: 66 },
    { team: 'FC東京', played: 34, win: 18, draw: 8, loss: 8, goalsFor: 55, goalsAgainst: 40, points: 62 },
    { team: 'セレッソ大阪', played: 34, win: 17, draw: 10, loss: 7, goalsFor: 52, goalsAgainst: 38, points: 61 },
    { team: '名古屋グランパス', played: 34, win: 16, draw: 11, loss: 7, goalsFor: 48, goalsAgainst: 35, points: 59 },
    { team: '浦和レッズ', played: 34, win: 16, draw: 9, loss: 9, goalsFor: 50, goalsAgainst: 42, points: 57 },
    { team: '鹿島アントラーズ', played: 34, win: 15, draw: 11, loss: 8, goalsFor: 49, goalsAgainst: 41, points: 56 },
    { team: 'ガンバ大阪', played: 34, win: 14, draw: 12, loss: 8, goalsFor: 47, goalsAgainst: 39, points: 54 },
    { team: '柏レイソル', played: 34, win: 14, draw: 10, loss: 10, goalsFor: 45, goalsAgainst: 43, points: 52 },
    { team: '湘南ベルマーレ', played: 34, win: 13, draw: 11, loss: 10, goalsFor: 42, goalsAgainst: 44, points: 50 },
    { team: 'FC町田ゼルビア', played: 34, win: 12, draw: 13, loss: 9, goalsFor: 40, goalsAgainst: 38, points: 49 },
    { team: 'アビスパ福岡', played: 34, win: 12, draw: 10, loss: 12, goalsFor: 38, goalsAgainst: 40, points: 46 },
    { team: '東京ヴェルディ', played: 34, win: 11, draw: 12, loss: 11, goalsFor: 36, goalsAgainst: 39, points: 45 },
    { team: 'ジュビロ磐田', played: 34, win: 10, draw: 13, loss: 11, goalsFor: 35, goalsAgainst: 41, points: 43 },
    { team: '北海道コンサドーレ札幌', played: 34, win: 9, draw: 14, loss: 11, goalsFor: 33, goalsAgainst: 42, points: 41 },
    { team: '京都サンガF.C.', played: 34, win: 8, draw: 15, loss: 11, goalsFor: 31, goalsAgainst: 45, points: 39 },
    { team: 'ヴィッセル神戸', played: 34, win: 7, draw: 16, loss: 11, goalsFor: 29, goalsAgainst: 47, points: 37 },
    { team: 'アルビレックス新潟', played: 34, win: 6, draw: 17, loss: 11, goalsFor: 27, goalsAgainst: 49, points: 35 },
    { team: 'サガン鳥栖', played: 34, win: 5, draw: 18, loss: 11, goalsFor: 25, goalsAgainst: 51, points: 33 }
];

const premierLeagueData = [
    { team: 'Manchester City', played: 38, win: 28, draw: 7, loss: 3, goalsFor: 96, goalsAgainst: 34, points: 91 },
    { team: 'Arsenal', played: 38, win: 26, draw: 8, loss: 4, goalsFor: 91, goalsAgainst: 29, points: 86 },
    { team: 'Liverpool', played: 38, win: 25, draw: 9, loss: 4, goalsFor: 86, goalsAgainst: 41, points: 84 },
    { team: 'Aston Villa', played: 38, win: 22, draw: 8, loss: 8, goalsFor: 76, goalsAgainst: 61, points: 74 },
    { team: 'Tottenham', played: 38, win: 20, draw: 8, loss: 10, goalsFor: 74, goalsAgainst: 61, points: 68 },
    { team: 'Chelsea', played: 38, win: 18, draw: 11, loss: 9, goalsFor: 77, goalsAgainst: 63, points: 65 },
    { team: 'Newcastle', played: 38, win: 18, draw: 9, loss: 11, goalsFor: 85, goalsAgainst: 62, points: 63 },
    { team: 'Manchester United', played: 38, win: 17, draw: 10, loss: 11, goalsFor: 58, goalsAgainst: 58, points: 61 },
    { team: 'West Ham', played: 38, win: 16, draw: 11, loss: 11, goalsFor: 65, goalsAgainst: 68, points: 59 },
    { team: 'Brighton', played: 38, win: 15, draw: 13, loss: 10, goalsFor: 58, goalsAgainst: 50, points: 58 },
    { team: 'Crystal Palace', played: 38, win: 14, draw: 12, loss: 12, goalsFor: 57, goalsAgainst: 58, points: 54 },
    { team: 'Bournemouth', played: 38, win: 13, draw: 13, loss: 12, goalsFor: 54, goalsAgainst: 67, points: 52 },
    { team: 'Fulham', played: 38, win: 13, draw: 11, loss: 14, goalsFor: 55, goalsAgainst: 61, points: 50 },
    { team: 'Wolves', played: 38, win: 12, draw: 13, loss: 13, goalsFor: 50, goalsAgainst: 65, points: 49 },
    { team: 'Everton', played: 38, win: 12, draw: 10, loss: 16, goalsFor: 40, goalsAgainst: 51, points: 46 },
    { team: 'Brentford', played: 38, win: 11, draw: 12, loss: 15, goalsFor: 52, goalsAgainst: 55, points: 45 },
    { team: 'Nottingham Forest', played: 38, win: 10, draw: 13, loss: 15, goalsFor: 49, goalsAgainst: 62, points: 43 },
    { team: 'Luton Town', played: 38, win: 8, draw: 11, loss: 19, goalsFor: 50, goalsAgainst: 81, points: 35 },
    { team: 'Burnley', played: 38, win: 6, draw: 10, loss: 22, goalsFor: 41, goalsAgainst: 78, points: 28 },
    { team: 'Sheffield United', played: 38, win: 4, draw: 9, loss: 25, goalsFor: 35, goalsAgainst: 104, points: 21 }
];

// リーグ切り替え関数
function showLeague(league) {
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.league-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (league === 'jleague') {
        document.querySelector('.league-btn[onclick="showLeague(\'jleague\')"]').classList.add('active');
        document.getElementById('jleague-table').classList.add('active');
        document.getElementById('premier-table').classList.remove('active');
    } else {
        document.querySelector('.league-btn[onclick="showLeague(\'premier\')"]').classList.add('active');
        document.getElementById('premier-table').classList.add('active');
        document.getElementById('jleague-table').classList.remove('active');
    }
}

// 順位表を初期化
function initializeStandings() {
    // サンプルデータを表示（GitHub Pages用：静的サイト）
    renderStandings('jleague', jleagueData);
    renderStandings('premier', premierLeagueData);
    
    // 注意: GitHub Pagesは静的サイトのため、サーバーサイドのスクレイピングは使用できません
    // 実際のデータを取得するには、Vercelなどのサーバーが必要です
}

// プレミアリーグの順位表を取得（GitHub Pages用：無効化）
// 注意: GitHub Pagesは静的サイトのため、サーバーサイドのスクレイピングは使用できません
async function loadPremierLeagueStandings() {
    // GitHub Pagesでは使用しない（サンプルデータを表示）
    console.log('GitHub Pagesではサーバーサイドのスクレイピングは使用できません。サンプルデータを表示します。');
}

// Jリーグの順位表を取得（GitHub Pages用：無効化）
// 注意: GitHub Pagesは静的サイトのため、サーバーサイドのスクレイピングは使用できません
async function loadJLeagueStandings() {
    // GitHub Pagesでは使用しない（サンプルデータを表示）
    console.log('GitHub Pagesではサーバーサイドのスクレイピングは使用できません。サンプルデータを表示します。');
}

// 順位表用の通知を表示
function showStandingsNotification(message, type) {
    // 既存の通知システムを使用
    if (typeof showNotification === 'function') {
        showNotification(message, type);
    } else {
        console.log(message);
    }
}

// 順位表をレンダリング
function renderStandings(league, data) {
    const tbody = document.getElementById(`${league}-tbody`);
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach((team, index) => {
        const row = document.createElement('tr');
        const goalDiff = team.goalsFor - team.goalsAgainst;
        const goalDiffText = goalDiff >= 0 ? `+${goalDiff}` : `${goalDiff}`;
        
        // 上位3チームに特別なクラスを追加
        let rowClass = '';
        if (index === 0) rowClass = 'champion';
        else if (index === 1) rowClass = 'runner-up';
        else if (index === 2) rowClass = 'third-place';
        
        row.className = rowClass;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="team-name">${team.team}</td>
            <td>${team.played}</td>
            <td>${team.win}</td>
            <td>${team.draw}</td>
            <td>${team.loss}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${goalDiffText}</td>
            <td class="points">${team.points}</td>
        `;
        
        tbody.appendChild(row);
    });
}

