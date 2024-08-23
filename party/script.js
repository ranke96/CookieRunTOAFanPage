document.addEventListener('DOMContentLoaded', function() {
    const selectors = document.querySelectorAll('.star-selector');
    selectors.forEach(selector => {
        selector.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const star = parseInt(this.getAttribute('data-star'));
            updateStars(type, star);
            calculateAndDisplay();
        });
    });

    const inputs = document.querySelectorAll('#character, #weapon, #helmet, #clothes, #pants, #clothes_potential_1, #clothes_potential_2, #clothes_potential_1_value, #clothes_potential_2_value, #pants_potential_1, #pants_potential_2, #pants_potential_1_value, #pants_potential_2_value');
    inputs.forEach(input => {
        input.addEventListener('input', calculateAndDisplay);
        input.addEventListener('change', calculateAndDisplay);
    });

    document.getElementById('reset-button').addEventListener('click', resetAll);

    function updateStars(type, selectedStar) {
        document.querySelectorAll(`.star-selector[data-type="${type}"]`).forEach(el => {
            const starValue = parseInt(el.getAttribute('data-star'));
            if (starValue <= selectedStar) {
                el.classList.remove('inactive');
            } else {
                el.classList.add('inactive');
            }
        });
    }

    function calculateAndDisplay() {
        let totalBonus = 0;
        let totalPenalty = 0;

        // Calculate character bonus/penalty
        const character = document.getElementById('character').value;
        if (character === 'rockstar') {
            totalBonus += 15;
        } else if (character === 'blackberry') {
            totalPenalty += 15;
        }

        // Calculate weapon bonus/penalty
        const weapon = document.getElementById('weapon').value;
        const weaponStars = document.querySelectorAll('.star-selector[data-type="weapon"]:not(.inactive)').length;

        if (weapon === 'rock_guitar' && character === 'rockstar') {
            totalBonus += [16, 18, 20, 22, 24][weaponStars - 1];
        } else if (weapon === 'blackberry_candle' && character === 'blackberry') {
            totalPenalty += [16, 18, 20, 22, 24][weaponStars - 1];
        }

        // Update weapon preview
        const weaponPreview = document.getElementById('weapon-preview');
        weaponPreview.textContent = `增益: ${weapon === 'rock_guitar' && character === 'rockstar' ? [16, 18, 20, 22, 24][weaponStars - 1] : 0}% | 減益: ${weapon === 'blackberry_candle' && character === 'blackberry' ? [16, 18, 20, 22, 24][weaponStars - 1] : 0}%`;

        // Calculate helmet bonus/penalty
        const helmet = document.getElementById('helmet').value;
        const helmetStars = document.querySelectorAll('.star-selector[data-type="helmet"]:not(.inactive)').length;

        if (helmet === 'party_hat') {
            totalBonus += [8, 9, 10, 11, 12][helmetStars - 1];
        } else if (helmet === 'ghost_pirate_hat') {
            totalPenalty += [10, 11.25, 12.5, 13.75, 15][helmetStars - 1];
        }

        // Update helmet preview
        const helmetPreview = document.getElementById('helmet-preview');
        helmetPreview.textContent = `增益: ${helmet === 'party_hat' ? [8, 9, 10, 11, 12][helmetStars - 1] : 0}% | 減益: ${helmet === 'ghost_pirate_hat' ? [10, 11.25, 12.5, 13.75, 15][helmetStars - 1] : 0}%`;

        // Calculate pants bonus/penalty
        const pants = document.getElementById('pants').value;
        const pantsStars = document.querySelectorAll('.star-selector[data-type="pants"]:not(.inactive)').length;

        let pantsBonus = 0;
        let pantsPenalty = 0;

        if (pants === 'trumpet_pants') {
            pantsBonus = [8, 9, 10, 11, 12][pantsStars - 1];
        }

        // Add potential bonuses and penalties for pants
        const pantsPotential1 = document.getElementById('pants_potential_1').value;
        const pantsPotential1Value = parseFloat(document.getElementById('pants_potential_1_value').value) || 0;
        const pantsPotential2 = document.getElementById('pants_potential_2').value;
        const pantsPotential2Value = parseFloat(document.getElementById('pants_potential_2_value').value) || 0;

        if (pantsPotential1 === 'bonus') {
            pantsBonus += pantsPotential1Value;
        } else if (pantsPotential1 === 'penalty') {
            pantsPenalty += pantsPotential1Value;
        }

        if (pantsPotential2 === 'bonus') {
            pantsBonus += pantsPotential2Value;
        } else if (pantsPotential2 === 'penalty') {
            pantsPenalty += pantsPotential2Value;
        }

        // Update pants preview
        const pantsPreview = document.getElementById('pants-preview');
        pantsPreview.textContent = `增益: ${pantsBonus}% | 減益: ${pantsPenalty}%`;

        // Add potential bonuses and penalties for clothes
        const clothesPotential1 = document.getElementById('clothes_potential_1').value;
        const clothesPotential1Value = parseFloat(document.getElementById('clothes_potential_1_value').value) || 0;
        const clothesPotential2 = document.getElementById('clothes_potential_2').value;
        const clothesPotential2Value = parseFloat(document.getElementById('clothes_potential_2_value').value) || 0;

        let clothesBonus = 0;
        let clothesPenalty = 0;

        if (clothesPotential1 === 'bonus') {
            clothesBonus += clothesPotential1Value;
        } else if (clothesPotential1 === 'penalty') {
            clothesPenalty += clothesPotential1Value;
        }

        if (clothesPotential2 === 'bonus') {
            clothesBonus += clothesPotential2Value;
        } else if (clothesPotential2 === 'penalty') {
            clothesPenalty += clothesPotential2Value;
        }

        // Update clothes preview
        const clothesPreview = document.getElementById('clothes-preview');
        clothesPreview.textContent = `增益: ${clothesBonus}% | 減益: ${clothesPenalty}%`;

        // Update final result
        document.getElementById('result').textContent = `增益: ${totalBonus + clothesBonus + pantsBonus}% | 減益: ${totalPenalty + clothesPenalty}%`;
    }

    function resetAll() {
        document.getElementById('character').value = 'none';
        document.getElementById('weapon').value = 'none';
        document.getElementById('helmet').value = 'none';
        document.getElementById('clothes').value = 'none';
        document.getElementById('pants').value = 'none';
        document.getElementById('clothes_potential_1').value = 'none';
        document.getElementById('clothes_potential_2').value = 'none';
        document.getElementById('clothes_potential_1_value').value = '';
        document.getElementById('clothes_potential_2_value').value = '';
        document.getElementById('pants_potential_1').value = 'none';
        document.getElementById('pants_potential_2').value = 'none';
        document.getElementById('pants_potential_1_value').value = '';
        document.getElementById('pants_potential_2_value').value = '';

        document.querySelectorAll('.star-selector').forEach(el => el.classList.add('inactive'));
        document.querySelectorAll('.star-selector[data-star="1"]').forEach(el => el.classList.remove('inactive'));

        calculateAndDisplay();
    }

    calculateAndDisplay();
});
