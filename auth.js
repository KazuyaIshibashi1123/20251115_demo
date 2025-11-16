// 認証関連の機能

// ログイン状態をチェック
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// ユーザー名を取得
function getUsername() {
    return localStorage.getItem('username') || '';
}

// ログイン処理
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // デモ用：任意のユーザー名・パスワードでログイン可能
    if (username && password) {
        // ログイン状態を保存
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        if (remember) {
            // ログイン状態を保持（30日間）
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            localStorage.setItem('loginExpiry', expiryDate.toISOString());
        }
        
        // ログイン成功メッセージ
        showNotification('ログインに成功しました！', 'success');
        
        // 少し遅延してからリダイレクト
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } else {
        showNotification('ユーザー名とパスワードを入力してください', 'error');
    }
}

// ログアウト処理
function handleLogout() {
    if (confirm('ログアウトしますか？')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('loginExpiry');
        
        showNotification('ログアウトしました', 'success');
        
        // ログインページにリダイレクト
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}

// ログイン状態をチェックしてナビゲーションを更新
function updateNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || '';
    
    // 既存のログイン/ログアウトボタンを削除
    const existingAuthBtn = navMenu.querySelector('.auth-btn');
    if (existingAuthBtn) {
        existingAuthBtn.remove();
    }
    
    // 新しい認証ボタンを作成
    const authItem = document.createElement('li');
    authItem.className = 'auth-item';
    
    if (isLoggedIn) {
        // ログイン中：ユーザー名とログアウトボタンを表示
        authItem.innerHTML = `
            <span class="user-name">${username}さん</span>
            <button class="btn-secondary btn-logout" onclick="handleLogout()">ログアウト</button>
        `;
    } else {
        // 未ログイン：ログインボタンを表示
        authItem.innerHTML = `
            <a href="login.html" class="auth-btn">ログイン</a>
        `;
    }
    
    navMenu.appendChild(authItem);
}

// ログイン状態をチェックしてページアクセスを制御
function checkAuthStatus() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // ログインページ以外で未ログインの場合、ログインページにリダイレクトしない
    // （デモ用なので、自由に閲覧できるようにする）
    
    // ログイン有効期限をチェック
    const expiry = localStorage.getItem('loginExpiry');
    if (expiry) {
        const expiryDate = new Date(expiry);
        if (new Date() > expiryDate) {
            // 有効期限切れ
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('loginExpiry');
        }
    }
}

// 通知を表示する関数
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒後に削除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    
    // index.htmlの場合のみナビゲーションを更新
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        updateNavigation();
    }
});

