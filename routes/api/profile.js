const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../model/Profile');
const User = require('../../model/User');
const validateProfileInput = require('../../validation/user/profile');
const validateExperienceInput = require('../../validation/user/experience');
const validateEducationInput = require('../../validation/user/education');

// @route /api/profile
// @desc get the crrent user profile
// @access private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});

// @route /api/profile
// @desc create user profile
// @access private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validate Input
    const {
        errors,
        isValid
    } = validateProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills - split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Socials
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    // Find User
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    })
                    .then(profile => res.json(profile))

            } else {
                // Create
                Profile.findOne({
                        handle: req.body.handle
                    })
                    .then(profile => {
                        // Check if handle exists
                        if (profile) {
                            errors.handle = 'That handle alreadly exist!';
                            return res.status(400).json(errors);
                        }
                        // Save Profile
                        new Profile(profileFields).save()
                            .then(profile => res.json(profile));
                    })
            }
        })


});

// @route /api/profile/user/:user_id
// @desc get  profile by user id
// @access public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json({
            profile: 'There is no profile for this user'
        }))

});
// @route /api/profile/handle/:handle
// @desc get  profile by handle
// @access public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json({
            profile: 'There is no profile for this user'
        }))

});
// @route /api/profile/profiles
// @desc get all profiles
// @access public
router.get('/profiles', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There is no profile information';
                return res.status(404).json(errors);
            }
            res.json(profiles)
        })
        .catch(err => res.status(404).json({
            profiles: 'There is no profile information'
        }))

});
// @route /api/profile/experience
// @desc add experience to  profile 
// @access private
router.post('/experience', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateExperienceInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        };
        if (profile) {
            // Add to Experience Array
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile))

        }
    })

});
// @route /api/profile/education
// @desc add education to  profile 
// @access private
router.post('/education', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateEducationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,

        };
        if (profile) {
            // Add to Education Array
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile))

        }
    }).catch(err => res.json(err))

});
// @route /api/profile/experience/:exp_id
// @desc delete profile experience 
// @access private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        if(profile) {
            // Get remove index
            const removeIndex = profile.experience.map(item => item.id)
                                                    .indexOf(req.params.exp_id);

            // Splice out of array
            profile.experience.splice(removeIndex, 1);

            // Save
            profile.save().then(profile => res.json(profile));
        }
    }).catch(err => res.status(404).json(err))

});
// @route /api/profile/education/:edu_id
// @desc delete profile education 
// @access private
router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    
    Profile.findOne({
        user: req.user.id
    }).then(profile => {
        if(profile) {
            // Get remove index
            const removeIndex = profile.education.map(item => item.id)
                                                    .indexOf(req.params.edu_id);

            // Splice out of array
            profile.education.splice(removeIndex, 1);

            // Save
            profile.save().then(profile => res.json(profile));
        }
    }).catch(err => res.status(404).json(err))

});
// @route /api/profile
// @desc delete profile 
// @access private
router.delete('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({_id: req.user.id}).then(() => res.json({success: true}));
    });
    

});

module.exports = router;