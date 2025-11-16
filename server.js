const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORSを有効化
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Jリーグの順位表をスクレイピング
async function scrapeJLeague() {
    try {
        // YahooスポーツのJリーグ順位表ページ
        const url = 'https://soccer.yahoo.co.jp/jleague/category/j1/standings';
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3'
            }
        });
        
        const $ = cheerio.load(response.data);
        const standings = [];
        
        // テーブルからデータを抽出
        // Yahooスポーツのテーブル構造: sc-tableValueクラスを使用
        $('table.sc-tableValue tbody tr').each((index, element) => {
            const $row = $(element);
            const cells = $row.find('td');
            
            // テーブルの列構造を確認
            // 順位（colspan=2の可能性あり）、チーム名、勝点、試合数、勝数、引分数、敗数、得点、失点、得失点差
            if (cells.length >= 8) {
                // チーム名を取得（リンクの中または直接テキスト）
                let team = '';
                const teamCell = cells.eq(2); // 3番目のセルがチーム名
                if (teamCell.length > 0) {
                    team = teamCell.find('a').text().trim() || teamCell.text().trim();
                }
                
                // データを取得（列の位置を調整）
                const points = parseInt(cells.eq(3).text().trim()) || 0;
                const played = parseInt(cells.eq(4).text().trim()) || 0;
                const win = parseInt(cells.eq(5).text().trim()) || 0;
                const draw = parseInt(cells.eq(6).text().trim()) || 0;
                const loss = parseInt(cells.eq(7).text().trim()) || 0;
                const goalsFor = parseInt(cells.eq(8).text().trim()) || 0;
                const goalsAgainst = parseInt(cells.eq(9).text().trim()) || 0;
                
                // チーム名が有効で、ヘッダー行でないことを確認
                if (team && team.length > 0 && !team.includes('順位') && !team.includes('チーム名')) {
                    standings.push({
                        team,
                        played,
                        win,
                        draw,
                        loss,
                        goalsFor,
                        goalsAgainst,
                        points
                    });
                }
            }
        });
        
        // データが見つからない場合、別の方法を試す
        if (standings.length === 0) {
            console.log('Yahooスポーツからの取得に失敗、代替方法を試行...');
            return await scrapeJLeagueAlternative();
        }
        
        console.log(`Jリーグの順位表を取得しました: ${standings.length}チーム`);
        return standings;
    } catch (error) {
        console.error('Jリーグのスクレイピングエラー:', error.message);
        // エラー時は代替サイトを試す
        return await scrapeJLeagueAlternative();
    }
}

// Jリーグの代替スクレイピング（サッカーキングなど）
async function scrapeJLeagueAlternative() {
    try {
        // サッカーキングのJリーグ順位表ページ
        const url = 'https://www.soccer-king.jp/league/j1/standings/';
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const $ = cheerio.load(response.data);
        const standings = [];
        
        // テーブル構造に応じてセレクタを調整
        $('table tbody tr, .standings-table tr').each((index, element) => {
            const $row = $(element);
            const cells = $row.find('td');
            
            if (cells.length >= 8) {
                const team = $(cells[1]).text().trim();
                const played = parseInt($(cells[2]).text().trim()) || 0;
                const win = parseInt($(cells[3]).text().trim()) || 0;
                const draw = parseInt($(cells[4]).text().trim()) || 0;
                const loss = parseInt($(cells[5]).text().trim()) || 0;
                const goalsFor = parseInt($(cells[6]).text().trim()) || 0;
                const goalsAgainst = parseInt($(cells[7]).text().trim()) || 0;
                const points = parseInt($(cells[8] || cells[cells.length - 1]).text().trim()) || 0;
                
                if (team && team.length > 0) {
                    standings.push({
                        team,
                        played,
                        win,
                        draw,
                        loss,
                        goalsFor,
                        goalsAgainst,
                        points
                    });
                }
            }
        });
        
        return standings;
    } catch (error) {
        console.error('Jリーグの代替スクレイピングエラー:', error.message);
        return [];
    }
}

// プレミアリーグの順位表をスクレイピング
async function scrapePremierLeague() {
    try {
        // Yahooスポーツのプレミアリーグ順位表ページ
        const url = 'https://soccer.yahoo.co.jp/ws/category/eng/standings';
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3'
            }
        });
        
        const $ = cheerio.load(response.data);
        const standings = [];
        
        // テーブルからデータを抽出
        // Yahooスポーツのテーブル構造: sc-tableValueクラスを使用（Jリーグと同じ構造）
        $('table.sc-tableValue tbody tr').each((index, element) => {
            const $row = $(element);
            const cells = $row.find('td');
            
            // テーブルの列構造: 順位、チーム名、勝点、試合数、勝数、引分数、敗数、得点、失点、得失点差
            if (cells.length >= 8) {
                // チーム名を取得（リンクの中または直接テキスト）
                let team = '';
                const teamCell = cells.eq(2); // 3番目のセルがチーム名
                if (teamCell.length > 0) {
                    team = teamCell.find('a').text().trim() || teamCell.text().trim();
                }
                
                // データを取得（列の位置を調整）
                const points = parseInt(cells.eq(3).text().trim()) || 0;
                const played = parseInt(cells.eq(4).text().trim()) || 0;
                const win = parseInt(cells.eq(5).text().trim()) || 0;
                const draw = parseInt(cells.eq(6).text().trim()) || 0;
                const loss = parseInt(cells.eq(7).text().trim()) || 0;
                const goalsFor = parseInt(cells.eq(8).text().trim()) || 0;
                const goalsAgainst = parseInt(cells.eq(9).text().trim()) || 0;
                
                // チーム名が有効で、ヘッダー行でないことを確認
                if (team && team.length > 0 && !team.includes('順位') && !team.includes('チーム名')) {
                    standings.push({
                        team,
                        played,
                        win,
                        draw,
                        loss,
                        goalsFor,
                        goalsAgainst,
                        points
                    });
                }
            }
        });
        
        // データが見つからない場合、別の方法を試す
        if (standings.length === 0) {
            console.log('Yahooスポーツからの取得に失敗、代替方法を試行...');
            return await scrapePremierLeagueAlternative();
        }
        
        console.log(`プレミアリーグの順位表を取得しました: ${standings.length}チーム`);
        return standings;
    } catch (error) {
        console.error('プレミアリーグのスクレイピングエラー:', error.message);
        // エラー時は代替サイトを試す
        return await scrapePremierLeagueAlternative();
    }
}

// プレミアリーグの代替スクレイピング
async function scrapePremierLeagueAlternative() {
    try {
        // BBCスポーツのプレミアリーグ順位表
        const url = 'https://www.bbc.com/sport/football/premier-league/table';
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const $ = cheerio.load(response.data);
        const standings = [];
        
        $('table tbody tr').each((index, element) => {
            const $row = $(element);
            const cells = $row.find('td');
            
            if (cells.length >= 9) {
                const team = $(cells[1]).text().trim();
                const played = parseInt($(cells[2]).text().trim()) || 0;
                const win = parseInt($(cells[3]).text().trim()) || 0;
                const draw = parseInt($(cells[4]).text().trim()) || 0;
                const loss = parseInt($(cells[5]).text().trim()) || 0;
                const goalsFor = parseInt($(cells[6]).text().trim()) || 0;
                const goalsAgainst = parseInt($(cells[7]).text().trim()) || 0;
                const points = parseInt($(cells[8]).text().trim()) || 0;
                
                if (team && team.length > 0) {
                    standings.push({
                        team,
                        played,
                        win,
                        draw,
                        loss,
                        goalsFor,
                        goalsAgainst,
                        points
                    });
                }
            }
        });
        
        return standings;
    } catch (error) {
        console.error('プレミアリーグの代替スクレイピングエラー:', error.message);
        return [];
    }
}

// APIエンドポイント: Jリーグの順位表
app.get('/api/jleague', async (req, res) => {
    try {
        const standings = await scrapeJLeague();
        res.json({ success: true, data: standings });
    } catch (error) {
        console.error('JリーグAPIエラー:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// APIエンドポイント: プレミアリーグの順位表
app.get('/api/premier', async (req, res) => {
    try {
        const standings = await scrapePremierLeague();
        res.json({ success: true, data: standings });
    } catch (error) {
        console.error('プレミアリーグAPIエラー:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ルートページ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
    console.log('APIエンドポイント:');
    console.log(`  - Jリーグ: http://localhost:${PORT}/api/jleague`);
    console.log(`  - プレミアリーグ: http://localhost:${PORT}/api/premier`);
});

