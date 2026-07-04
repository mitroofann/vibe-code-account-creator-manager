// ourtoken/add-to-omniroute.js
// Добавляет ourtoken-аккаунт в OmniRoute через HTTP Management API.
//
// Запуск: node ourtoken/add-to-omniroute.js <email> <apiKey> [omniManageKey]
//
// omniManageKey можно передать через env OMNI_MANAGE_KEY.

const NODE_ID = process.env.OMNI_OURTOKEN_NODE || 'anthropic-compatible-34c2e97b-e3f1-46cf-8fd6-cfbcd34f5655';
const OMNI_BASE = process.env.OMNI_BASE_URL || 'http://localhost:20128';

function log(tag, msg) {
    const t = new Date().toISOString().substring(11, 23);
    console.log(`[${t}] [${tag}] ${msg}`);
}

function maskKey(k) {
    if (!k || k.length < 12) return '—';
    return k.substring(0, 8) + '***' + k.slice(-4);
}

async function main() {
    const [email, apiKey, argManageKey] = process.argv.slice(2);
    if (!email || !apiKey) {
        console.error(JSON.stringify({ ok: false, error: 'usage: node add-to-omniroute.js <email> <apiKey> [omniManageKey]' }));
        process.exit(1);
    }

    const manageKey = argManageKey || process.env.OMNI_MANAGE_KEY;
    if (!manageKey) {
        console.error(JSON.stringify({ ok: false, error: 'Management key required: pass as 3rd arg or set OMNI_MANAGE_KEY' }));
        process.exit(1);
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + manageKey,
    };

    // Проверка дубля по email через список всех connections
    const listRes = await fetch(`${OMNI_BASE}/api/providers`, { headers });
    if (!listRes.ok) {
        const body = await listRes.text();
        console.error(JSON.stringify({ ok: false, error: `Failed to list providers: ${listRes.status} ${body}` }));
        process.exit(1);
    }
    const { connections } = await listRes.json();
    const existing = connections.find(c =>
        c.provider === NODE_ID && (c.email === email || c.name === email || c.apiKey?.startsWith(apiKey.substring(0, 8)))
    );
    if (existing) {
        log('exists', `${email} already in OmniRoute as ${existing.id}`);
        console.log(JSON.stringify({ ok: true, id: existing.id, action: 'exists', email }));
        return;
    }

    // Добавляем через POST /api/providers
    const addRes = await fetch(`${OMNI_BASE}/api/providers`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            provider: NODE_ID,
            authType: 'apikey',
            name: email,
            email: email,
            apiKey: apiKey,
            priority: 1,
            isActive: true,
        }),
    });
    if (!addRes.ok) {
        const body = await addRes.text();
        console.error(JSON.stringify({ ok: false, error: `Failed to add provider: ${addRes.status} ${body}` }));
        process.exit(1);
    }
    const { connection } = await addRes.json();
    const id = connection.id;
    log('added', `${email} -> ${maskKey(apiKey)} as ${id}`);

    // Тест соединения
    try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 15000);
        const testRes = await fetch(`${OMNI_BASE}/api/providers/${id}/test`, {
            method: 'POST',
            headers,
            signal: ctrl.signal,
            body: JSON.stringify({ validationModelId: 'claude-sonnet-4-6' }),
        });
        clearTimeout(t);
        if (testRes.ok) {
            const data = await testRes.json().catch(() => ({}));
            log(data.valid ? 'test' : 'test', `${email} -> ${data.valid ? 'connected' : 'test failed, stays active'}`);
        }
    } catch (err) {
        log('warn', `${email} -> test skipped: ${err.message}`);
    }

    console.log(JSON.stringify({ ok: true, id, email, action: 'added' }));
}

main().catch(err => {
    console.error(JSON.stringify({ ok: false, error: err.message }));
    process.exit(1);
});
