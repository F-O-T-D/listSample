const express = require('express');

const router = express.Router();
const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

router.route('/api/search', async (req, res, next) => {
    try {
        console.log('라우터 호출 확인');
        console.log(process.env.KAKAO_API_KEY);

        const { query } = req.query;

        // 카카오 키워드 장소 검색 API 호출
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query,
            },
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
            },
        });
        console.log(response.config.headers)
        // 검색 결과를 클라이언트에 반환
        res.json(response.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});