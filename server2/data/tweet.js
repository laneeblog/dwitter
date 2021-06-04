let tweets = [
    {
        id: "1",
        text: '드림코딩 너무 좋으다',
        createdAt: Date.now.toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: "2",
        text: '우앙',
        createdAt: Date.now.toString(),
        name: 'Bob',
        username: 'bob',
    },
];

export async function getAll() {
    return tweets;
}

export async function getByUsername(userName) {
    return tweets.filter(v => v.username === userName)
}

export async function getById(id) {
    return tweets.find(v => v.id === id);
}

export async function create(text, username, name) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets];     // 지금 추가하는 것을 맨 앞으로 추가
    return tweet;
}

export async function update(text, id) {
    const tweet = tweets.find(v => v.id === id);
    if(tweet) {
        tweet.text = text;
    }
    return tweet;   // 없으면 undefined 리턴
}

export async function remove(id) {
    tweets.some((v, i) => {
        if (v.id == id) {
            tweets.splice(i, 1);
        }
    })
    // tweets = tweets.filter(v => v.id !== id); > 앨리의 방법
}