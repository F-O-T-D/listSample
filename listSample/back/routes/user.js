const express = require('express');
const User=require('../models/user');
const Map=require('../models/map');

const router = express.Router();

router.get('/:storeId', async (req, res, next) => {
    try {
        const userId=123;
        const storeId=8;
        //const userId=req.params.userId;
        //const storeId=req.params.storeId;

        console.log('사용자 데이터 조회 중');

        const user=await User.findByPk(userId, {
            include: {
                model: Map,
                as:'maps',
            }
        });

        if (!user) {
            res.status(404).json({message: 'User not found'})
            return;
        }

        console.log('가게 데이터 조회 중');

        const selectedStore = user.maps.find(store => store.id === storeId);

        if (!selectedStore) {
            return res.status(404).json({ message: 'Store not found for this user' });
        }

        console.log('가게 정보 전송 중');
        res.json({
            store: {
                id: selectedStore.id,
                name: selectedStore.name, //가게 이름
                latitude: selectedStore.lat, //위도
                longitude: selectedStore.lng, //경도
            },
        });
        console.log('전송 완료');
    } catch(error) {
        console.error(error);
        next(error);
    }
});


// 특정 사용자의 특정 가게를 삭제
router.delete('/:storeId', async (req, res, next) => {
    try {
        const userId = 123;
        //const storeId = 8;
        //const userId = req.params.userId;
        const storeId = req.params.storeId;

        // 사용자와 가게 모두 존재하는지 확인
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const store = await Map.findByPk(storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
/*
        // Store 모델의 userId 값을 설정하여 제거
        await store.update({ userId: null });
        
        // 사용자의 가게 리스트에서 해당 가게 제거
        await user.removeMap(store);
*/
        // storeId에 해당하는 가게를 삭제
        await Map.destroy({
            where: {
                id: storeId,
            },
        });        
        res.json({ message: 'Store removed from user' });
        console.log('삭제 완료');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

 module.exports=router;