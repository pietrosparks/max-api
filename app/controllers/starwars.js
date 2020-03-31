const express = require('express')
const router = express.Router()
const axios = require('axios')

const { Comment } = require('../models')

const StarwarService = require('../services/starwars')
const { starwarsBaseUrl } = StarwarService
const { response, errorResponse, cmToFeetConverter } = require('../utils')

router.get('/film', async (req, res) => {
  const filmUrl = `${starwarsBaseUrl}/films`
  try {
    const films = (await axios.get(filmUrl)).data.results

    const sortedFilms = films
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
      .map((f) => ({
        title: f.title,
        episode_id: f.episode_id,
        opening_crawl: f.opening_crawl,
        release_date: f.release_date,
        comment_count: 0
      }))

    const episodeIds = sortedFilms.map((f) => f.episode_id)
    const comments = await Comment.findCommentsViaEpisodeIds(episodeIds)

    comments.forEach((c) => {
      const foundFilm = sortedFilms.find((f) => c.episodeId == f.episode_id)
      if (!foundFilm) return

      foundFilm.comment_count++
    })

    return response(
      200,
      'success',
      res,
      'Successfully retrieved StarWars films',
      sortedFilms
    )
  } catch (err) {
    errorResponse(err, res, 'Error occured while fetching StarWars films')
  }
})

router.get('/people', async function(req, res) {
  const peopleUrl = `${starwarsBaseUrl}/people`
  const { sort, order, filter } = req.query

  try {
    let people = (await axios.get(peopleUrl)).data.results

    if (!!filter) {
      if (!['male', 'female'].includes(filter.toLowerCase())) return
      people = people.filter((p) => p.gender === filter)
    }

    if (!!sort) {
      const criteria = StarwarService.sortHelper(sort, order)
      people = people.sort(criteria)
    }

    const totalCount = people.length

    const totalHeightInCm = people
      .map((p) => Number(p.height))
      .reduce((acc, curr) => acc + curr, 0)

    const totalHeightInFt = cmToFeetConverter(totalHeightInCm)

    const meta = {
      totalCount,
      totalHeight: {
        ft: totalHeightInFt,
        cm: totalHeightInCm
      }
    }

    return response(
      200,
      'success',
      res,
      'Successfully retrieved Star wars characters',
      people,
      meta
    )
  } catch (err) {
    errorResponse(err, res, 'Error occured while fetching Star wars characters')
  }
})

router.post('/film/:id/comment', async (req, res) => {
  try {
    const { text } = req.body
    const episodeId = req.params.id
    const { ip } = req

    if (!ip) {
      throw new Error('IP Not Found')
    }

    if (!text) {
      throw new Error('Must Send Comment.')
    }

    if (text.length > 500) {
      throw new Error('Comment word count exceeds 500 characters.')
    }

    const splitIP = ip.split(':')
    const parsedIP = splitIP[splitIP.length - 1]

    const newComment = {
      text,
      episodeId,
      ip: parsedIP
    }

    await Comment.create(newComment)

    return response(200, 'success', res, 'Successfully posted comment')
  } catch (err) {
    errorResponse(err, res, 'Error occured while posting comment')
  }
})

router.get('/film/:id', async (req, res) => {
  try {
    const episodeId = req.params.id
    const filmUrl = `${starwarsBaseUrl}/films`

    // Retrieving all films because  `film/:id` isnt same as `episode_id` returned;
    const filmResponse = (await axios.get(filmUrl)).data.results
    const film = filmResponse.find((f) => f.episode_id == episodeId)

    const comments = await Comment.findCommentsViaEpisodeIds([episodeId])

    const selectedFilmFields = {
      title: film.title,
      episode_id: film.episode_id,
      opening_crawl: film.opening_crawl,
      release_date: film.release_date,
      comments
    }

    return response(
      200,
      'success',
      res,
      'Successfully retrieved film',
      selectedFilmFields
    )
  } catch (err) {
    errorResponse(err, res, 'Error occured while retrieving comments')
  }
})

module.exports = router
