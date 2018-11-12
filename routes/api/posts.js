const express = require("express");
const router = express.Router();
const mangoose = require("mongoose");
const passport = require("passport");

// Lode validation
const validatePostInput = require("../../validation/post");
// Lode Post Model
const Post = require("../../models/Post");
// Lode Profile Model
const Profile = require("../../models/Profile");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
// Only For Test
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   POST api/posts
// @desc    Creat Post
// @access  Privete
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      // Return  Errors
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   Get api/posts
// @desc    Get Post
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopost: "there is no post" }));
});

// @route   Get api/posts/:id
// @desc    Get Post by id
// @access  Public
router.get("/:id", (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => res.status(400).json({ nopost: "there is no post" }));
});

// @route   Delete api/posts/:id
// @desc    Delete Post by id
// @access  Privete

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check For Post Owner
          if (post.user.toString() !== req.user.id) {
            // id string must user be string
            return res
              .status(401)
              .json({ notauthorized: "User Not Authorized" });
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ noPostFound: "No Post Found" }));
    });
  }
);

// @route   Post api/posts/like:id
// @desc    Like Post by id
// @access  Privete

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "alredy Liked This Post" });
          }

          //Add User ID To Likes array
          post.likes.unshift({ user: req.user.id });
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ noPostFound: "No Post Found" }));
    });
  }
);

// @route   Post api/posts/unlike:id
// @desc    unLike Post by id
// @access  Privete

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "Not Yet liked this post" });
          }

          //Get Remove index by map & indexOf
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice array
          post.likes.splice(removeIndex, 1);
          //Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ noPostFound: "No Post Found" }));
    });
  }
);

// @route   Post api/posts/comment/:id
// @desc    Comment Post by id
// @access  Privete

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      // Return  Errors
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // Add To Comment
        post.comments.unshift({ newComment });
        // Save Comment
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
  }
);

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Remove Comment from Post
// @access  Privete

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.commment_id
          ).length === 0
        ) {
          return res.status(404).json({ commentnotexists: "No Comment Found" });
        }
        // Get Index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        //remove
        post.comments.splice(removeIndex, 1);
        //Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
  }
);

module.exports = router;
